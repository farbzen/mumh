use serde_json::{Map, Value, from_str};
use std::path::Path;

const PATH_LANGUAGE_FILES: &str = "language";

pub const LANGUAGES_SUPPORTED: [&str; 2] = ["en", "de"];
pub const DEFAULT_LANGUAGE: &str = "en";

/// Read the dictionary of one language as `{ <key>: <text> }`.
fn language_dictionary(language: &str) -> Value {
    let file = super::read_json_file(
        Path::new(PATH_LANGUAGE_FILES).join(language.to_string() + ".json"),
    );

    from_str(&file).expect("Invalid language file!")
}

/// All supported languages as `{ "<lang>": { <key>: <text> } }`.
pub fn all_languages() -> Map<String, Value> {
    LANGUAGES_SUPPORTED
        .iter()
        .map(|lang| (lang.to_string(), language_dictionary(lang)))
        .collect()
}
