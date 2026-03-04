#!/usr/bin/env python3

import os
import json
import tempfile
import subprocess
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_gog_credentials():
    """Use existing gog credentials"""
    try:
        token_file = tempfile.mktemp(suffix='.json')
        
        export_cmd = [
            'gog', 'auth', 'tokens', 'export', 'dora@wtf-agency.com',
            '--output', token_file
        ]
        
        result = subprocess.run(
            export_cmd, 
            capture_output=True, 
            text=True,
            env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'}
        )
        
        if result.returncode == 0:
            with open(token_file, 'r') as f:
                token_data = json.load(f)
            
            creds = Credentials(
                token=None,
                refresh_token=token_data.get('refresh_token'),
                token_uri='https://oauth2.googleapis.com/token',
                client_id='824858676072-csj3d1qdnaiegl5f06nbtel96va8o930.apps.googleusercontent.com',
                client_secret='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',
                scopes=token_data.get('scopes', ['https://www.googleapis.com/auth/drive'])
            )
            
            os.unlink(token_file)
            return creds
        else:
            return None
            
    except Exception as e:
        return None

def add_world_skate_content():
    """Add World Skate specific content to the 4 stages"""
    
    print("🛹 ADDING WORLD SKATE SPECIFIC CONTENT...")
    
    creds = get_gog_credentials()
    if not creds:
        print("❌ Failed to get credentials")
        return False
    
    try:
        service = build('slides', 'v1', credentials=creds)
        
        presentation_id = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
        
        # Additional replacements for World Skate specificity
        print("📝 Adding specific World Skate context to the 4 stages...")
        
        replacements = [
            # Fix remaining inconsistencies first
            ("$2..100.000 + i.v.a.", "USD 17,500 + fees"),
            ("DIRECCIÓN ESTRATÉGICA, CREATIVA Y DE CONTENIDO PARA LA MARCA PERSONAL MALEK.", "DIRECCIÓN ESTRATÉGICA, CREATIVA Y DE CONTENIDO PARA WORLD SKATE PLATFORM."),
            
            # Add World Skate specific content to the 4 pillars
            ("Arquitectura de marca personal sobre 4 pilares: Positioning, Image, Storytelling, Community.", 
             "Arquitectura de plataforma global sobre 4 pilares estratégicos:\n\n• POSITIONING: World Skate como organismo rector que impulsa la evolución del deporte\n• IMAGE: Identidad visual moderna que conecta tradición olímpica con cultura urbana contemporánea\n• STORYTELLING: Narrativas que posicionan el skateboarding como herramienta de transformación social y empoderamiento juvenil\n• COMMUNITY: Ecosistema que conecta 130+ federaciones nacionales con base local y proyección global"),
            
            # Enhance the narrative progression  
            ("Narrativa : Governing → Leading → Empowering.", 
             "Narrativa estratégica de 3 fases:\n\n• GOVERNING: Establecer World Skate como autoridad técnica y moral del skateboarding global\n• LEADING: Liderar la transformación del deporte hacia nuevos territorios (inclusión, sostenibilidad, innovación)\n• EMPOWERING: Empoderar a comunidades locales para que el skate sea herramienta de cambio social positivo"),
            
            # Add specific World Skate deliverables
            ("Brand Bible World Skate (tono, voz, reglas del universo).", 
             "Brand Bible World Skate: Manual de identidad que define tono de autoridad técnica + cercanía juvenil, voz que equilibra institucionalidad olímpica con autenticidad street, y reglas del universo visual que conectan heritage deportivo con cultura contemporánea."),
            
            ("press kit internacional para 130 federaciones", 
             "Press kit internacional: Toolkit completo para 130+ federaciones nacionales con assets adaptables a contextos locales, templates de comunicación, guidelines de co-branding, y recursos para activaciones territoriales que respeten la identidad global de World Skate.")
        ]
        
        # Create batch update requests
        requests = []
        for i, (old_text, new_text) in enumerate(replacements, 1):
            print(f"  {i}. Enhancing: {old_text[:50]}...")
            
            request = {
                'replaceAllText': {
                    'containsText': {
                        'text': old_text,
                        'matchCase': True
                    },
                    'replaceText': new_text
                }
            }
            requests.append(request)
        
        print(f"\n⚡ Applying {len(requests)} World Skate enhancements...")
        
        # Execute the batch update
        body = {'requests': requests}
        response = service.presentations().batchUpdate(
            presentationId=presentation_id,
            body=body
        ).execute()
        
        print("🎉 SUCCESS! World Skate specific content added!")
        print(f"✅ Applied {len(response.get('replies', []))} enhancements")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during enhancement: {e}")
        return False

if __name__ == "__main__":
    success = add_world_skate_content()
    
    if success:
        print("\n" + "="*70)
        print("🛹 WORLD SKATE CONTENT ENHANCEMENTS COMPLETED!")
        print("="*70)
        print("✅ ADDED SPECIFIC CONTENT FOR THE 4 STRATEGIC PILLARS:")
        print("\n   🎯 POSITIONING: World Skate como organismo rector evolutivo")
        print("   🎨 IMAGE: Identidad que conecta tradición olímpica + cultura urbana")  
        print("   📖 STORYTELLING: Skate como herramienta de transformación social")
        print("   🌍 COMMUNITY: Ecosistema de 130+ federaciones globales")
        print("\n🔄 ENHANCED 3-PHASE NARRATIVE:")
        print("   • GOVERNING → Autoridad técnica y moral")
        print("   • LEADING → Transformación hacia nuevos territorios") 
        print("   • EMPOWERING → Cambio social positivo")
        print("\n🔗 LINK: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
        print("📋 STATUS: Enhanced with World Skate specificity - Ready to send!")
    else:
        print("\n❌ ENHANCEMENT FAILED")
        print("🔧 Check presentation manually")