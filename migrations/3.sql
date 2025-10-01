
ALTER TABLE favicon_sets ADD COLUMN is_animated BOOLEAN DEFAULT 0;
ALTER TABLE favicon_sets ADD COLUMN animation_type TEXT;
ALTER TABLE favicon_sets ADD COLUMN animation_frames INTEGER;
ALTER TABLE favicon_sets ADD COLUMN seasonal_effect TEXT;
ALTER TABLE favicon_sets ADD COLUMN seasonal_expiry DATETIME;
ALTER TABLE favicon_sets ADD COLUMN animation_data TEXT;
