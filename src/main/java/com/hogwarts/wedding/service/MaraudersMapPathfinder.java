package com.hogwarts.wedding.service;

import java.util.ArrayList;
import java.util.List;

/**
 * Mathematical waypoint pathfinding engine generating footstep coordinates across the Marauder's Map.
 */
public class MaraudersMapPathfinder {

    public record FootstepCoordinate(double xPercent, double yPixels, double angleDegrees, boolean isLeftFoot) {}

    public static List<FootstepCoordinate> generateContinuousParchmentPath(int totalSteps, double startY, double endY) {
        List<FootstepCoordinate> path = new ArrayList<>();
        double stepHeight = (endY - startY) / totalSteps;

        for (int i = 0; i < totalSteps; i++) {
            double progress = (double) i / totalSteps;
            // Harmonic sinusoidal parchment curve
            double x = 50.0 + 24.0 * Math.sin(progress * Math.PI * 3.5);
            double y = startY + i * stepHeight;

            // Angle of travel tangent
            double dx = 24.0 * Math.PI * 3.5 * Math.cos(progress * Math.PI * 3.5);
            double angle = Math.toDegrees(Math.atan2(stepHeight, dx)) - 90.0;
            boolean isLeft = (i % 2 == 0);

            path.add(new FootstepCoordinate(x, y, angle, isLeft));
        }
        return path;
    }
}