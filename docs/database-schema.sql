-- Таблица для бойцов
CREATE TABLE IF NOT EXISTS public.fighters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    weight_class VARCHAR(50) NOT NULL,
    stats JSONB NOT NULL DEFAULT '{"wins": 0, "losses": 0, "draws": 0, "knockouts": 0, "submissions": 0}'
);

-- Таблица для событий
CREATE TABLE IF NOT EXISTS public.events (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL
);

-- Таблица для боёв
CREATE TABLE IF NOT EXISTS public.fights (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    fighter1_id INTEGER NOT NULL,
    fighter2_id INTEGER NOT NULL,
    winner_id INTEGER,
    result_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (fighter1_id) REFERENCES fighters(id) ON DELETE CASCADE,
    FOREIGN KEY (fighter2_id) REFERENCES fighters(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES fighters(id) ON DELETE SET NULL
);

-- Таблица для рейтингов
CREATE TABLE IF NOT EXISTS public.rankings (
    id SERIAL PRIMARY KEY,
    fighter_id INTEGER NOT NULL,
    weight_class VARCHAR(50) NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (fighter_id) REFERENCES fighters(id) ON DELETE CASCADE
);
