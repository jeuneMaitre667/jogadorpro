#!/bin/bash
# Configuration script for Vercel deployment

echo "🚀 Configuring JogadorPro for Vercel Deployment"
echo ""

# URL Supabase
SUPABASE_URL="https://rzedmwvmdvbsaiqbfqxz.supabase.co"

# Clé Supabase (from .env.local)
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZWRtd3ZtZHZic2FpcWJmcXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDAwMDAsImV4cCI6MTc5MDAwMDAwMH0.placeholder"

echo "✅ Environment Variables:"
echo "   NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=[configured]"
echo ""
echo "📝 Next steps:"
echo "   1. Go to: https://vercel.com/projects/jogadorpro/settings/environment-variables"
echo "   2. Add these variables for Production:"
echo "      - NEXT_PUBLIC_SUPABASE_URL"
echo "      - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   3. Click 'Deploy' button"
echo ""
