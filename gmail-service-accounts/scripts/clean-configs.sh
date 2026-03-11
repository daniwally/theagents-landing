#!/bin/bash
# clean-configs.sh - Remove problematic gog configurations

set -e

echo "🧹 GMAIL CONFIGURATION CLEANER"
echo "=============================="

# Backup current configs
backup_dir="$HOME/.config/gogcli/backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"

echo "📦 Creating backup at: $backup_dir"
cp -r ~/.config/gogcli/* "$backup_dir/" 2>/dev/null || echo "No configs to backup"

echo ""
echo "🔍 CURRENT CONFIGURATIONS:"
gog auth list

echo ""
echo "🎯 CLEANING OPTIONS:"
echo "1. Remove ALL OAuth configurations (keep only service accounts)"
echo "2. Remove specific account"
echo "3. Remove ALL configurations (fresh start)"
echo "4. Remove duplicate service accounts for same domain"
echo "5. Cancel"

read -p "Choose option (1-5): " choice

case $choice in
    1)
        echo "🧹 Removing OAuth configurations..."
        # Find OAuth tokens and remove them
        find ~/.config/gogcli/keyring/ -name "*oauth*" -delete 2>/dev/null || true
        # Remove any remaining OAuth entries (gog doesn't have easy way to filter by type)
        echo "OAuth configurations removed."
        ;;
    2)
        echo "📋 Available accounts:"
        gog auth list | awk '{print NR ". " $1}'
        read -p "Enter account email to remove: " account
        gog auth remove "$account" --force || echo "Failed to remove $account"
        ;;
    3)
        read -p "⚠️  Remove ALL configurations? This cannot be undone! (y/N): " confirm
        if [[ $confirm == [yY] ]]; then
            rm -rf ~/.config/gogcli/keyring/* 2>/dev/null || true
            rm -f ~/.config/gogcli/sa-*.json 2>/dev/null || true
            echo "✅ All configurations removed"
        else
            echo "❌ Cancelled"
        fi
        ;;
    4)
        echo "🔍 Finding duplicate domains..."
        # Find domains with multiple accounts
        domains=$(gog auth list | awk '{print $1}' | grep '@' | cut -d'@' -f2 | sort | uniq -d)
        
        if [ -z "$domains" ]; then
            echo "✅ No duplicate domains found"
        else
            for domain in $domains; do
                echo ""
                echo "🔍 Multiple accounts for @$domain:"
                gog auth list | grep "@$domain"
                read -p "Enter account to KEEP (others will be removed): " keep_account
                
                # Remove all accounts for this domain except the one to keep
                gog auth list | grep "@$domain" | awk '{print $1}' | while read account; do
                    if [ "$account" != "$keep_account" ]; then
                        echo "Removing $account"
                        gog auth remove "$account" --force || echo "Failed to remove $account"
                    fi
                done
            done
        fi
        ;;
    5)
        echo "❌ Operation cancelled"
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "✅ CLEANUP COMPLETE"
echo ""
echo "📋 CURRENT CONFIGURATIONS:"
gog auth list

echo ""
echo "💾 BACKUP LOCATION: $backup_dir"
echo "To restore: cp $backup_dir/* ~/.config/gogcli/"