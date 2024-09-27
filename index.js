let totalXP = 16;
let spentXP = 0;

const skillTrees = {
    apothecary: {
        tier1: [
            { name: "Basic Apothecary", cost: 2 },
            { name: "First Aid", cost: 2 },
            { name: "Propagation", cost: 2 },
            { name: "Harvesting", cost: 2 }
        ],
        tier2: [
            { name: "Advanced Apothecary (requires Basic)", cost: 4 },
            { name: "Transit", cost: 4 },
            { name: "Herbalism (requires Harvesting)", cost: 4 }
        ],
        tier3: [
            { name: "Expert Apothecary (requires Basic)", cost: 6 },
            { name: "TPurify", cost: 6 }
        ],
        tier4: [
            { name: "Holistc Care", cost: 10 }
        ]
    },
    builder: {
        tier1: [
            { name: "Basic Building", cost: 2 },
            { name: "Refinement", cost: 2 },
            { name: "Brute Force", cost: 2 },
            { name: "Scrapping", cost: 2 }
        ],
        tier2: [
            { name: "Advance Building Requires Basic Building", cost: 4 },
            { name: "Honed Edge Requires Refinement", cost: 4 },
            { name: "Trade Market", cost: 4 }
        ],
        tier3: [
            { name: "Expert Building Requires ADV Building", cost: 6 },
            { name: "Stopgap", cost: 6 }
        ],
        tier4: [
            { name: "Workhorse Requires EXPT Building", cost: 10 }
        ]
    
    },
    clever: {
        tier1: [
            { name: "Transcribe", cost: 2 },
            { name: "Literacy", cost: 2 },
            { name: "Susout", cost: 2 },
            { name: "Entertain", cost: 2 }
        ],
        tier2: [
            { name: "Educated (requires Literacy)", cost: 4 },
            { name: "Perception", cost: 4 },
            { name: "Stealth", cost: 4 }
        ],
        tier3: [
            { name: "Teaching", cost: 6 },
            { name: "Leap", cost: 6 }
        ],
        tier4: [
            { name: "Silvertongue (requires Entertain)", cost: 10 }
        ]
    },
    cook: {
        tier1: [
            { name: "Basic Cooking Bake (can't take Fry)", cost: 2 }, 
            { name: "Basic Cooking Fry (can't take Bake)", cost: 2 },
            { name: "Basic Brewing Boil (can't take Steep)", cost: 2 },
            { name: "Basic Brewing Steep (can't take Boil)", cost: 2 },
            { name: "First Aid", cost: 2 },
            { name: "Flee", cost: 2 }
        ],
        tier2: [
            { name: "Advanced Cooking Roast (can't take Grill, Requires Basic)", cost: 4 }, 
            { name: "Advanced Cooking Grill (can't take Roast, Requires Basic)", cost: 4 },
            { name: "Advanced Brewing Ferment (can't take distill, Requires Basic)", cost: 4 },
            { name: "Advamced Brewing Distill (can't take Ferment, Requires Basic)", cost: 4 },
            { name: "Camming", cost: 4 },
        ],
        tier3: [
            { name: "Expert Cooking Steam (can't take Smoke)", cost: 6 }, 
            { name: "Advanced Cooking Smoke (can't take Steam)", cost: 6 },
            { name: "Combination Cooking (Requires Canning)", cost: 6 },
        ],
        tier4: [
            { name: "Nutritionist (requires Expt Cooking)", cost: 10 }
        ]
    },
    gatherer: {
        tier1: [
            { name: "Scrapping", cost: 2 },
            { name: "Harvesting", cost: 2 },
            { name: "Animal Handling", cost: 2 },
            { name: "Propagation", cost: 2 }
        ],
        tier2: [
            { name: "Husbandry (requires Animal Handling)", cost: 4 },
            { name: "Herbalism", cost: 4 },
            { name: "Dismantle (requires Scrapping)", cost: 4 }
        ],
        tier3: [
            { name: "Purify", cost: 6 },
            { name: "Truffle Nose (requires Herbalism)", cost: 6 }
        ],
        tier4: [
            { name: "Animal Whisperer (requires Husbandry)", cost: 10 }
        ]
    },
    liturgy: {
        tier1: [
            { name: "Baptize", cost: 2 },
            { name: "Ministrations", cost: 2 },
            { name: "Therapy", cost: 2 },
            { name: "Blessing", cost: 2 }
        ],
        tier2: [
            { name: "Cleanse Malady", cost: 4 },
            { name: "Perception", cost: 4 },
            { name: "Stealth", cost: 4 }
        ],
        tier3: [
            { name: "Teaching", cost: 6 },
            { name: "Leap", cost: 6 }
        ],
        tier4: [
            { name: "Silvertongue (requires Entertain)", cost: 10 }
        ]
    },
};

const purchasedSkills = {
    tier1: 0,
    tier2: 0,
    tier3: 0,
    tier4: 0
};

function showSkills() {
    const selectedTree = document.getElementById('skill-tree-1').value;
    const skillsBox = document.getElementById('skills-box');
    const skillsSelect = document.getElementById('skills');

    if (selectedTree && skillTrees[selectedTree]) {
        skillsBox.style.display = 'block';
        skillsSelect.innerHTML = '<option value="">-- Select a Skill --</option>';

        addSkillsToDropdown(skillsSelect, skillTrees[selectedTree].tier1, "Tier 1 Skills");
    } else {
        skillsBox.style.display = 'none';
    }
}

function addSkillsToDropdown(selectElement, skillsArray, tierLabel) {
    const optGroup = document.createElement('optgroup');
    optGroup.label = tierLabel;

    skillsArray.forEach(skill => {
        const option = document.createElement('option');
        option.value = skill.name;
        option.textContent = `${skill.name} (Cost: ${skill.cost} XP)`;
        option.dataset.cost = skill.cost;
        option.dataset.tier = tierLabel.split(" ")[1];
        selectElement.appendChild(option);
    });

    selectElement.appendChild(optGroup);
}

function buySkill() {
    const selectedSkill = document.getElementById('skills');
    const selectedOption = selectedSkill.options[selectedSkill.selectedIndex];

    if (selectedOption.value === "") return;

    const skillCost = parseInt(selectedOption.dataset.cost);
    const skillTier = parseInt(selectedOption.dataset.tier);

    if (skillCost && (spentXP + skillCost) <= totalXP) {
        if (skillTier === 2 && purchasedSkills.tier1 < 2) {
            alert("You need to buy 2 Tier 1 skills first.");
            return;
        }
        if (skillTier === 3 && purchasedSkills.tier2 < 2) {
            alert("You need to buy 2 Tier 2 skills first.");
            return;
        }
        if (skillTier === 4 && purchasedSkills.tier3 < 2) {
            alert("You need to buy 2 Tier 3 skills first.");
            return;
        }

        spentXP += skillCost;
        purchasedSkills[`tier${skillTier}`]++;
        updateXPDisplay();

        const selectedSkillsList = document.getElementById('selected-skills-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = `${selectedOption.value} (Tier ${skillTier}, Cost: ${skillCost} XP) <button onclick="removeSkill(this, ${skillCost}, ${skillTier})">Remove</button>`;
        selectedSkillsList.appendChild(listItem);

        selectedOption.disabled = true;
        refreshDropdownOptions(skillTier, selectedTree);
    } else {
        alert("Not enough XP!");
    }
}

function removeSkill(button, skillCost, skillTier) {
    const listItem = button.parentElement;
    const selectedSkill = listItem.textContent.split(" (")[0];

    spentXP -= skillCost;
    purchasedSkills[`tier${skillTier}`]--;
    updateXPDisplay();

    const skillsSelect = document.getElementById('skills');
    Array.from(skillsSelect.options).forEach(option => {
        if (option.value === selectedSkill) {
            option.disabled = false;
        }
    });

    listItem.remove();
}

function refreshDropdownOptions(currentTier, selectedTree) {
    const skillsSelect = document.getElementById('skills');

    if (currentTier === 1 && purchasedSkills.tier1 === 2) {
        addSkillsToDropdown(skillsSelect, skillTrees[selectedTree].tier2, "Tier 2 Skills");
    }
    if (currentTier === 2 && purchasedSkills.tier2 === 2) {
        addSkillsToDropdown(skillsSelect, skillTrees[selectedTree].tier3, "Tier 3 Skills");
    }
    if (currentTier === 3 && purchasedSkills.tier3 === 2) {
        addSkillsToDropdown(skillsSelect, skillTrees[selectedTree].tier4, "Tier 4 Skills");
    }
}

function updateXPDisplay() {
    document.getElementById('xp-spent').textContent = spentXP;
    document.getElementById('total-xp').textContent = totalXP - spentXP;
}

