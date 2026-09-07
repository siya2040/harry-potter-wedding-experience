package com.hogwarts.wedding.service;

import com.hogwarts.wedding.model.HogwartsHouse;
import java.util.*;

/**
 * Service managing the magical Sorting Hat ceremony calculations and house selection.
 */
public class SortingHatService {

    private static final Map<HogwartsHouse, List<String>> DELIBERATIONS = Map.of(
        HogwartsHouse.GRYFFINDOR, List.of(
            "Ah, yes... a heart brimming with courage and nerve. Untamed bravery! You belong in GRYFFINDOR!",
            "Plenty of chivalry and daring here. No fear in facing the unknown. Better be GRYFFINDOR!"
        ),
        HogwartsHouse.SLYTHERIN, List.of(
            "I see boundless ambition and great cunning. You could achieve true greatness here... SLYTHERIN!",
            "Sharp instincts and resourcefulness. You will find true destiny in SLYTHERIN!"
        ),
        HogwartsHouse.RAVENCLAW, List.of(
            "A ready wit and an insatiable thirst for knowledge. Wisdom shines bright. RAVENCLAW!",
            "Originality, eccentricity, and genius intertwined. A true scholar for RAVENCLAW!"
        ),
        HogwartsHouse.HUFFLEPUFF, List.of(
            "Such unwavering loyalty, truth, and patient devotion. Unafraid of honest toil. HUFFLEPUFF!",
            "A pure spirit where kindness and steadfast friendship reign supreme. HUFFLEPUFF!"
        )
    );

    public record SortingResult(HogwartsHouse house, String deliberationSpeech, String celebrationSpell) {}

    public SortingResult sortCandidate(String guestName) {
        Random random = new Random(guestName != null ? guestName.hashCode() : System.currentTimeMillis());
        HogwartsHouse[] houses = HogwartsHouse.values();
        HogwartsHouse selected = houses[random.nextInt(houses.length)];

        List<String> speeches = DELIBERATIONS.get(selected);
        String speech = speeches.get(random.nextInt(speeches.size()));

        return new SortingResult(selected, speech, "Red and Gold Sparks!");
    }
}