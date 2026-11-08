{pkgs, ...}: {
  packages = with pkgs; [
    tailwindcss_4
    pkg-config
    prettierd
    python3
  ];

  languages.rust.enable = true;

  scripts = {
    tailwind.exec = ''
      tailwindcss -i tailwind.css -o static/css/main.css -w
    '';

    tailwindmini.exec = ''
      tailwindcss -i tailwind.css -o static/css/main.css -m -w
    '';

    build.exec = ''
      tailwindcss -i tailwind.css -o static/css/main.css -m && cargo run --release
    '';

    serve.exec = ''
      python3 -m http.server -d dist 8000
    '';
  };
}
