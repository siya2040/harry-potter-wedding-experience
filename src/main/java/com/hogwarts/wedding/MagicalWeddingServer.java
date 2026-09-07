package com.hogwarts.wedding;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.awt.Desktop;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;

/**
 * MagicalWeddingServer: Java HTTP & REST API Server
 * Powers the Harry Potter Interactive Wedding Experience with guest registry,
 * sorting hat logic, and static file serving.
 */
public class MagicalWeddingServer {

    private static final int PORT = 8080;
    private static final Map<String, GuestRegistration> GUEST_REGISTRY = new ConcurrentHashMap<>();
    private static final LocalDateTime WEDDING_DATE = LocalDateTime.of(2026, Month.OCTOBER, 31, 16, 0);

    public record GuestRegistration(String name, String house, boolean attending, long timestamp) {}

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // 1. Static Asset Handlers
        server.createContext("/", new StaticFileHandler());

        // 2. REST API Handlers
        server.createContext("/api/rsvp", new RsvpApiHandler());
        server.createContext("/api/sorting-hat", new SortingHatApiHandler());
        server.createContext("/api/countdown", new CountdownApiHandler());

        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
        server.start();

        printBanner();

        // Automatically launch the default browser
        if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            try {
                Desktop.getDesktop().browse(new URI("http://localhost:" + PORT + "/"));
            } catch (Exception ignored) {}
        }
    }

    private static void printBanner() {
        System.out.println("""
            ========================================================================
              ✦ HOGWARTS MATRIMONIAL GAZETTE - JAVA BACKEND SERVER ✦
              Serving Julian & Seraphina's Unbreakable Vow on Port %d
            ========================================================================
              ⚡ Local URL : http://localhost:%d/
              ⚡ REST APIs :
                 • POST /api/rsvp        (Guest RSVP Registry)
                 • GET  /api/sorting-hat (House Sorting Ceremony)
                 • GET  /api/countdown   (Time-Turner Precision Clock)
            ========================================================================
            """.formatted(PORT, PORT));
    }

    /**
     * Serves HTML, CSS, JavaScript, and Assets
     */
    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path == null || path.equals("/") || path.isEmpty()) {
                path = "/index.html";
            }

            File file = new File("." + path);
            if (!file.exists() || file.isDirectory()) {
                // Fallback search in working dir
                file = new File(path.substring(1));
            }

            if (!file.exists()) {
                String notFound = "<h1>404 - Wand Spell Missed</h1><p>File not found.</p>";
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                exchange.sendResponseHeaders(404, notFound.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(notFound.getBytes(StandardCharsets.UTF_8));
                }
                return;
            }

            String contentType = determineContentType(file.getName());
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, file.length());

            try (InputStream is = new FileInputStream(file); OutputStream os = exchange.getResponseBody()) {
                is.transferTo(os);
            }
        }

        private String determineContentType(String fileName) {
            if (fileName.endsWith(".html")) return "text/html; charset=UTF-8";
            if (fileName.endsWith(".css")) return "text/css; charset=UTF-8";
            if (fileName.endsWith(".js")) return "application/javascript; charset=UTF-8";
            if (fileName.endsWith(".svg")) return "image/svg+xml";
            if (fileName.endsWith(".json")) return "application/json; charset=UTF-8";
            if (fileName.endsWith(".ics")) return "text/calendar; charset=UTF-8";
            return "application/octet-stream";
        }
    }

    /**
     * Handles Guest RSVP Registration via POST
     */
    static class RsvpApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");

            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                String name = extractJsonValue(body, "name", "Honored Guest");
                String house = extractJsonValue(body, "house", "Gryffindor");
                boolean attending = !"false".equalsIgnoreCase(extractJsonValue(body, "attending", "true"));

                GUEST_REGISTRY.put(name, new GuestRegistration(name, house, attending, System.currentTimeMillis()));
                System.out.printf("[RSVP Received] %s sorted into %s (Attending: %s)%n", name, house, attending);

                String jsonResponse = """
                    {"status":"success","message":"Owl dispatched successfully to Owlery!","guest":"%s","house":"%s"}
                    """.formatted(name, house);
                exchange.sendResponseHeaders(200, jsonResponse.getBytes(StandardCharsets.UTF_8).length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(jsonResponse.getBytes(StandardCharsets.UTF_8));
                }
            } else {
                // List registrations
                StringBuilder sb = new StringBuilder("{\"guests\":[");
                int count = 0;
                for (GuestRegistration g : GUEST_REGISTRY.values()) {
                    if (count++ > 0) sb.append(",");
                    sb.append(String.format("{\"name\":\"%s\",\"house\":\"%s\",\"attending\":%b}", g.name(), g.house(), g.attending()));
                }
                sb.append("]}");
                byte[] bytes = sb.toString().getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }
            }
        }

        private String extractJsonValue(String json, String key, String defaultVal) {
            String search = "\"" + key + "\":\"";
            int start = json.indexOf(search);
            if (start == -1) return defaultVal;
            start += search.length();
            int end = json.indexOf("\"", start);
            if (end == -1) return defaultVal;
            return json.substring(start, end);
        }
    }

    /**
     * Provides Sorting Hat House Evaluations
     */
    static class SortingHatApiHandler implements HttpHandler {
        private static final List<String> HOUSES = List.of("Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff");

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");

            String chosen = HOUSES.get(new Random().nextInt(HOUSES.size()));
            String response = """
                {"house":"%s","deliberation":"Hmm... difficult. Very difficult. Plenty of courage, I see. Better be %s!"}
                """.formatted(chosen, chosen.toUpperCase());

            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }
    }

    /**
     * Calculates countdown delta in Java
     */
    static class CountdownApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");

            Duration delta = Duration.between(LocalDateTime.now(), WEDDING_DATE);
            long days = delta.toDays();
            long hours = delta.toHoursPart();
            long minutes = delta.toMinutesPart();
            long seconds = delta.toSecondsPart();

            String json = """
                {"days":%d,"hours":%d,"minutes":%d,"seconds":%d,"weddingDate":"%s"}
                """.formatted(days, hours, minutes, seconds, WEDDING_DATE.toString());

            byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }
    }
}
