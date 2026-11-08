use serde::{Deserialize, Serialize};

const PATH_WEAPON_FILE: &str = "weapons.json";

#[derive(Debug, Deserialize, Serialize)]
pub struct Weapons {
    weapons: Vec<Weapon>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Weapon {
    pub name: String,
}

pub fn load_weapons() -> Vec<Weapon> {
    let file = super::read_json_file(PATH_WEAPON_FILE.into());

    serde_json::from_str::<Weapons>(&file)
        .expect("Invalid weapon file!")
        .weapons
}
