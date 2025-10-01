
CREATE TABLE favicon_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_filename TEXT NOT NULL,
  original_file_key TEXT NOT NULL,
  cropped_file_key TEXT,
  android_chrome_192_key TEXT,
  android_chrome_512_key TEXT,
  apple_touch_icon_key TEXT,
  favicon_16_key TEXT,
  favicon_32_key TEXT,
  favicon_ico_key TEXT,
  webmanifest_key TEXT,
  is_processed BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_favicon_sets_created_at ON favicon_sets(created_at);
