#!/usr/bin/env python3

import os
import subprocess
import json

def edit_slides_with_gog():
    """Use gog commands to edit the presentation"""
    
    print("🔄 Editing World Skate presentation using available tools...")
    
    # We know gog slides works, let's try to use it for individual updates
    presentation_id = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA"
    
    # Let's try to see if we can create a Google Apps Script to do this
    apps_script = '''
function updateWorldSkatePresentation() {
  var presentationId = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA";
  
  var replacements = [
    ["PRESUPUESTO PISCO DIABLO", "PRESUPUESTO WORLD SKATE"],
    ["CREATIVIDAD OPERANDO EN MODO IA", "PLATAFORMA CULTURAL GLOBAL EN MODO IA"],
    ["marca personal Malek", "World Skate Platform"],
    ["Malek", "World Skate"],
    ["$2.100.000", "USD 17,500"],
    ["durante 2026", "durante 24 meses"],
    ['"NO TALK. JUST RACE."', '"POWER TO MOVE SKATE FORWARD"'],
    ["Pista, Proceso, Control, Evolución", "Positioning, Image, Storytelling, Community"],
    ["Construcción → Presion → Evolución", "Governing → Leading → Empowering"],
    ["4-8 piezas de contenido por mes", "8-12 piezas de contenido por mes"],
    ["biblia de marca Malek", "Brand Bible World Skate"],
    ["press kit de proyección internacional", "press kit internacional para 130 federaciones"]
  ];
  
  var requests = [];
  
  for (var i = 0; i < replacements.length; i++) {
    requests.push({
      replaceAllText: {
        containsText: {
          text: replacements[i][0],
          matchCase: true
        },
        replaceText: replacements[i][1]
      }
    });
  }
  
  var batchUpdateRequest = {
    requests: requests
  };
  
  try {
    var response = Slides.Presentations.batchUpdate(batchUpdateRequest, presentationId);
    console.log("Successfully updated presentation!");
    return response;
  } catch (e) {
    console.log("Error updating presentation: " + e.toString());
    return null;
  }
}
'''
    
    # Save the Apps Script
    with open('/tmp/world_skate_apps_script.gs', 'w') as f:
        f.write(apps_script)
    
    print("📝 Created Google Apps Script at: /tmp/world_skate_apps_script.gs")
    print("🔗 Manual option: Copy this script to Google Apps Script and run updateWorldSkatePresentation()")
    
    # Show the manual curl command with the correct payload
    print("\n📋 Alternative: Use this curl command with your own OAuth token:")
    print(f"""
curl -X POST \\
  'https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate' \\
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d @/tmp/slides_batch_update.json
""")
    
    # Let's also try one more direct approach
    print("\n🎯 Trying one more automated approach...")
    
    # Check if we can use gog drive API to download, modify and re-upload
    # This is a workaround but might work
    try:
        # Try to export as PPTX and re-import
        print("Attempting to export presentation...")
        result = subprocess.run([
            'gog', 'slides', 'export', presentation_id, 
            '--format', 'pdf', 
            '--output', '/tmp/world_skate_backup.pdf'
        ], capture_output=True, text=True, env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'})
        
        if result.returncode == 0:
            print("✅ Successfully exported presentation backup")
        else:
            print(f"Export failed: {result.stderr}")
            
    except Exception as e:
        print(f"Export attempt failed: {e}")
    
    # Return instructions for manual completion
    return False

if __name__ == "__main__":
    success = edit_slides_with_gog()
    
    print("\n" + "="*60)
    print("🚀 WORLD SKATE PRESENTATION READY FOR FINAL STEP")
    print("="*60)
    print(f"📁 Presentation: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
    print(f"🔄 Status: Duplicated successfully, needs text replacements")
    print(f"⚡ Quick fix: Use Find & Replace (Ctrl+H) with these 12 changes:")
    print("")
    
    replacements = [
        ("PRESUPUESTO PISCO DIABLO", "PRESUPUESTO WORLD SKATE"),
        ("CREATIVIDAD OPERANDO EN MODO IA", "PLATAFORMA CULTURAL GLOBAL EN MODO IA"),
        ("marca personal Malek", "World Skate Platform"),
        ("Malek", "World Skate"),
        ("$2.100.000", "USD 17,500"),
        ("durante 2026", "durante 24 meses"),
        ('"NO TALK. JUST RACE."', '"POWER TO MOVE SKATE FORWARD"'),
        ("Pista, Proceso, Control, Evolución", "Positioning, Image, Storytelling, Community"),
        ("Construcción → Presion → Evolución", "Governing → Leading → Empowering"),
        ("4-8 piezas de contenido por mes", "8-12 piezas de contenido por mes"),
        ("biblia de marca Malek", "Brand Bible World Skate"),
        ("press kit de proyección internacional", "press kit internacional para 130 federaciones")
    ]
    
    for i, (old, new) in enumerate(replacements, 1):
        print(f"{i:2d}. '{old}' → '{new}'")
    
    print("")
    print("⏱️ Estimated time: 5 minutes")
    print("🎯 Result: Perfect World Skate presentation ready for client!")
    print("="*60)