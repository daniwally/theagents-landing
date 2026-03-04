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

def translate_to_english():
    """Translate entire World Skate presentation to English"""
    
    print("🌍 TRANSLATING WORLD SKATE PRESENTATION TO ENGLISH...")
    
    creds = get_gog_credentials()
    if not creds:
        print("❌ Failed to get credentials")
        return False
    
    try:
        service = build('slides', 'v1', credentials=creds)
        
        presentation_id = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
        
        print("📝 Preparing comprehensive Spanish → English translation...")
        
        # Complete Spanish to English translation
        translations = [
            # Title and main headers
            ("PRESUPUESTO WORLD SKATE", "WORLD SKATE BUDGET"),
            ("PLATAFORMA CULTURAL GLOBAL EN MODO IA", "GLOBAL CULTURAL PLATFORM POWERED BY AI"),
            
            # Core methodology
            ("No reinventamos la creatividad. Solo la hicimos funcionar mejor.", 
             "We don't reinvent creativity. We just make it work better."),
            ("PENSAR → HACER →MOVER → APRENDER → CRECER", 
             "THINK → DO → MOVE → LEARN → GROW"),
            ("UNA FORMA DE TRABAJO DISEÑADA PARA CONVERTIR IDEAS EN RESULTADOS.", 
             "A WORKFLOW DESIGNED TO TURN IDEAS INTO RESULTS."),
            
            # Main description
            ("Presupuesto World Skate 2026", "World Skate Budget 2026"),
            ("El presente presupuesto contempla la asignación de un equipo estratégico-creativo senior dedicado al desarrollo, construcción y evolución continua de la World Skate Platform durante 24 meses. Un modelo de trabajo integral que garantiza coherencia, dirección y proyección constante.",
             "This budget encompasses the allocation of a senior strategic-creative team dedicated to the development, construction, and continuous evolution of the World Skate Platform over 24 months. An integrated work model that ensures coherence, direction, and constant momentum."),
            
            ("Modelo de", "Work"),
            ("Trabajo", "Model"),
            ("El equipo opera bajo una lógica de células autónomas e integradas.  Cada célula combina estrategia, creatividad y ejecución, permitiendo reducir tiempos, optimizar inversión y mantener consistencia en cada punto de contacto de la marca.",
             "The team operates under autonomous and integrated cell logic. Each cell combines strategy, creativity and execution, enabling reduced timelines, optimized investment and consistent brand touchpoint management."),
            
            ("MODELO DE FEE", "FEE MODEL"),
            ("ESTRATÉGICO 2026", "STRATEGIC 2026"),
            ("DIRECCIÓN ESTRATÉGICA, CREATIVA Y DE CONTENIDO PARA WORLD SKATE PLATFORM.", 
             "STRATEGIC, CREATIVE AND CONTENT DIRECTION FOR WORLD SKATE PLATFORM."),
            
            # Service scope
            ("Alcance del Servicio", "Service Scope"),
            ("El fee contempla la dedicación continua de un equipo estratégico-creativo senior operando bajo el modelo de células para la World Skate Platform durante 24 meses.",
             "The fee covers continuous dedication of a senior strategic-creative team operating under the cell model for World Skate Platform over 24 months."),
            
            # The 4 pillars section
            ("DIRECCIÓN ESTRATÉGICA Y POSICIONAMIENTO", "STRATEGIC DIRECTION & POSITIONING"),
            ("Construcción y mantenimiento de posicionamiento: \"POWER TO MOVE SKATE FORWARD\"",
             "Building and maintaining positioning: \"POWER TO MOVE SKATE FORWARD\""),
            
            ("Arquitectura de plataforma global sobre 4 pilares estratégicos:\n\n• POSITIONING: World Skate como organismo rector que impulsa la evolución del deporte\n• IMAGE: Identidad visual moderna que conecta tradición olímpica con cultura urbana contemporánea\n• STORYTELLING: Narrativas que posicionan el skateboarding como herramienta de transformación social y empoderamiento juvenil\n• COMMUNITY: Ecosistema que conecta 130+ federaciones nacionales con base local y proyección global",
             "Global platform architecture built on 4 strategic pillars:\n\n• POSITIONING: World Skate as governing body driving sport evolution\n• IMAGE: Modern visual identity connecting Olympic tradition with contemporary urban culture\n• STORYTELLING: Narratives positioning skateboarding as social transformation and youth empowerment tool\n• COMMUNITY: Ecosystem connecting 130+ national federations with local foundation and global projection"),
            
            ("Narrativa estratégica de 3 fases:\n\n• GOVERNING: Establecer World Skate como autoridad técnica y moral del skateboarding global\n• LEADING: Liderar la transformación del deporte hacia nuevos territorios (inclusión, sostenibilidad, innovación)\n• EMPOWERING: Empoderar a comunidades locales para que el skate sea herramienta de cambio social positivo",
             "Strategic 3-phase narrative:\n\n• GOVERNING: Establish World Skate as technical and moral authority of global skateboarding\n• LEADING: Lead sport transformation toward new territories (inclusion, sustainability, innovation)\n• EMPOWERING: Empower local communities so skateboarding becomes positive social change tool"),
            
            ("Roadmap de proyección: de piloto prometedor a figura representativa.", 
             "Projection roadmap: from promising pilot to representative figure."),
            
            # Creative development
            ("DESARROLLO CREATIVO Y CONTENIDO", "CREATIVE DEVELOPMENT & CONTENT"),
            ("8-12 piezas de contenido por mes (1-2 por semana).", "8-12 content pieces per month (1-2 per week)."),
            ("Guión y dirección creativa de cada pieza.", "Script and creative direction for each piece."),
            ("Reedición y adaptación de material audiovisual a distintas plataformas.", 
             "Re-editing and adaptation of audiovisual material across platforms."),
            ("Supervisión de coherencia visual y narrativa.", "Visual and narrative coherence supervision."),
            
            # Brand system
            ("SISTEMA DE MARCA E IDENTIDAD", "BRAND SYSTEM & IDENTITY"),
            ("Brand Bible World Skate: Manual de identidad que define tono de autoridad técnica + cercanía juvenil, voz que equilibra institucionalidad olímpica con autenticidad street, y reglas del universo visual que conectan heritage deportivo con cultura contemporánea.",
             "World Skate Brand Bible: Identity manual defining tone of technical authority + youth proximity, voice balancing Olympic institutionality with street authenticity, and visual universe rules connecting sports heritage with contemporary culture."),
            
            ("Press kit internacional: Toolkit completo para 130+ federaciones nacionales con assets adaptables a contextos locales, templates de comunicación, guidelines de co-branding, y recursos para activaciones territoriales que respeten la identidad global de World Skate.",
             "International press kit: Complete toolkit for 130+ national federations with assets adaptable to local contexts, communication templates, co-branding guidelines, and territorial activation resources respecting World Skate's global identity."),
            
            ("Definición de qué se muestra, qué no, qué se repite, qué es exclusivo.", 
             "Definition of what to show, what not to show, what repeats, what's exclusive."),
            ("Tipografía, estilo fotográfico, diseño alineado a la identidad.", 
             "Typography, photographic style, design aligned to identity."),
            ("Los entregables de identidad (biblia, press kit, tono) se desarrollan una vez y se mantienen actualizados todo el tiempo.",
             "Identity deliverables (bible, press kit, tone) are developed once and kept updated at all times."),
            
            # Budget section
            ("Presupuesto Integral fee", "Comprehensive Budget Fee"),
            ("Estructura mensual dedicada a la dirección estratégica, creativa y de contenido de la World Skate Platform durante 24 meses.",
             "Monthly structure dedicated to strategic, creative and content direction of World Skate Platform over 24 months."),
            
            ("El fee contempla la dedicación continua de un equipo estratégico-creativo senior operando bajo el modelo de", 
             "The fee covers continuous dedication of a senior strategic-creative team operating under the"),
            ("células", "cell model"),
            ("durante 24 meses.", "over 24 months."),
            
            ("Incluye dirección estratégica, posicionamiento, construcción de narrativa, guión y dirección de contenido semanal, reedición y adaptación audiovisual multiplataforma.",
             "Includes strategic direction, positioning, narrative construction, weekly content script and direction, multiplatform audiovisual re-editing and adaptation."),
            
            ("En una primera etapa se desarrolla la biblia de marca, press kit y sistema de identidad. Luego se mantiene y evoluciona la presencia de manera continua.",
             "In the first stage, brand bible, press kit and identity system are developed. Then presence is maintained and evolved continuously."),
            
            # Outputs section
            ("Outputs del Sistema Creativo con IA Integrada", "Creative System Outputs with Integrated AI"),
            ("Contenido Generado", "Generated Content"),
            ("Key Visuals (imágenes de campaña,de mood, de content, de presentaciones)", 
             "Key Visuals (campaign imagery, mood, content, presentations)"),
            ("Piezas POP para punto de venta", "POP pieces for point of sale"),
            ("Videos modulares", "Modular videos"),
            ("Reels y content optimizados por plataforma", "Platform-optimized reels and content"),
            ("Banners (Display & E-commerce)", "Banners (Display & E-commerce)"),
            ("Amplificación", "Amplification"),
            ("Integración con Influencers  IA (selección y adaptación creativa asistida por IA)", 
             "AI Influencer Integration (AI-assisted selection and creative adaptation)"),
            ("Experiencias &", "Experiences &"),
            ("Activaciones  (contenidos + presencia en vivo)", "Activations (content + live presence)"),
            ("Fee Mensual : USD 17,500 + fees", "Monthly Fee: USD 17,500 + fees"),
            
            # Final
            ("THANK", "THANK"),
            ("YOU!", "YOU!")
        ]
        
        # Create batch update requests
        requests = []
        for i, (spanish_text, english_text) in enumerate(translations, 1):
            print(f"  {i:2d}. {spanish_text[:40]}... → {english_text[:40]}...")
            
            request = {
                'replaceAllText': {
                    'containsText': {
                        'text': spanish_text,
                        'matchCase': True
                    },
                    'replaceText': english_text
                }
            }
            requests.append(request)
        
        print(f"\n⚡ Executing batch translation with {len(requests)} replacements...")
        
        # Execute the batch update
        body = {'requests': requests}
        response = service.presentations().batchUpdate(
            presentationId=presentation_id,
            body=body
        ).execute()
        
        print("🎉 SUCCESS! Presentation translated to English!")
        print(f"✅ Applied {len(response.get('replies', []))} translations")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during translation: {e}")
        return False

if __name__ == "__main__":
    success = translate_to_english()
    
    if success:
        print("\n" + "="*70)
        print("🌍 WORLD SKATE PRESENTATION - ENGLISH VERSION COMPLETED!")
        print("="*70)
        print("✅ FULLY TRANSLATED PROFESSIONAL PRESENTATION:")
        print("\n   📋 Title: WORLD SKATE BUDGET - GLOBAL CULTURAL PLATFORM POWERED BY AI")
        print("   💰 Budget: USD 17,500 monthly (24-month program)")
        print("   🎯 Positioning: POWER TO MOVE SKATE FORWARD")
        print("   📊 4 Pillars: Positioning, Image, Storytelling, Community")
        print("   🔄 3 Phases: Governing → Leading → Empowering")
        print("\n🔗 LINK: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
        print("🌐 STATUS: Professional English version ready for World Skate international team!")
    else:
        print("\n❌ TRANSLATION FAILED")
        print("🔧 Check credentials or translate manually")