pub mod language;
pub mod monsters;
pub mod weapons;

use std::{
    fs::read_to_string,
    path::{Path, PathBuf},
};

/// Project root; all input and output paths are resolved against it,
/// independent of the directory the build is started from.
pub const PATH_ROOT: &str = env!("CARGO_MANIFEST_DIR");
pub const PATH_JSON_FILES: &str = "json";

/// Read a file below the JSON directory.
fn read_json_file(path: PathBuf) -> String {
    let path = Path::new(PATH_ROOT).join(PATH_JSON_FILES).join(path);

    read_to_string(&path)
        .unwrap_or_else(|e| panic!("Unable to read {}: {}", path.display(), e))
}
