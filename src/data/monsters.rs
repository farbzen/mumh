use serde::{Deserialize, Serialize};

const PATH_MONSTER_FILE: &str = "monsters.json";

#[derive(Debug, Deserialize, Serialize)]
pub struct Monsters {
    monsters: Vec<Monster>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Monster {
    pub name: String,
    pub capturable: bool,
    pub tempered: bool,
    pub arch_tempered: bool,
}

pub fn load_monsters() -> Vec<Monster> {
    let file = super::read_json_file(PATH_MONSTER_FILE.into());

    serde_json::from_str::<Monsters>(&file)
        .expect("Invalid monster file!")
        .monsters
}
