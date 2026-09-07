package com.hogwarts.wedding.service;

import java.util.List;
import java.util.Map;

/**
 * Service managing corporeal Patronus manifestations and happiest memory resonance.
 */
public class PatronusManifestationService {

    public record CorporealPatronus(String formName, String incantation, String happiestMemory, String etherealColor) {}

    private static final Map<String, CorporealPatronus> PATRONUSES = Map.of(
        "Julian", new CorporealPatronus("Silver Stag", "Expecto Patronum", "The moment she said Always under Orion", "#e0fbfc"),
        "Seraphina", new CorporealPatronus("Luminescent Swan", "Expecto Patronum", "First dance beneath the Great Hall starlight", "#ffffff")
    );

    public CorporealPatronus getCouplePatronus(String wizardName) {
        return PATRONUSES.getOrDefault(wizardName, new CorporealPatronus("Silver Phoenix", "Expecto Patronum", "Pure love", "#ffd700"));
    }

    public List<CorporealPatronus> getHarmonicDuo() {
        return List.of(PATRONUSES.get("Julian"), PATRONUSES.get("Seraphina"));
    }
}