-- Migration: Add match_commence_time column to picks table
-- Execute this in Supabase SQL Editor
-- This column stores the match start time to prevent bet cancellations after the match begins

ALTER TABLE picks
ADD COLUMN IF NOT EXISTS match_commence_time TIMESTAMP WITH TIME ZONE DEFAULT NULL;
