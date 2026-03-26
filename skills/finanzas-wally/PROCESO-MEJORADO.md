# 🔒 PROCESO FINANCIERO BLINDADO

## ❌ QUÉ FALLÓ

**Error crítico:** Faltan $3.1M de Galicia (26% del total)

**Causa raíz:** 
- Registros sin `Fecha_Recibimiento` → no aparecen en filtros mensuales
- No había verificación por banco individual
- Query incompleto sin double-check

## ✅ NUEVO PROCESO OBLIGATORIO

### 1. SCRIPT ÚNICO PARA RESÚMENES
```bash
./scripts/resumen-mensual-completo.sh YYYY MM
```

**Incluye:**
- ✅ Verificación por banco (Galicia, Supervielle, Macro, etc.)
- ✅ Listado completo de registros
- ✅ Alertas automáticas si falta algún banco
- ✅ Total final verificado

### 2. REGLAS DE CALIDAD DE DATOS

**OBLIGATORIAS:**
- ❌ **NUNCA** cargar sin `Fecha_Recibimiento`
- ❌ **NUNCA** dejar `Banco` vacío
- ❌ **NUNCA** montos sin verificar

**Al agregar registros:**
```bash
./scripts/add-gasto-airtable.sh "Nombre" "YYYY-MM-DD" "YYYY-MM-DD" "Monto" "Banco" "Concepto" "Status"
```

### 3. CHECKLIST RESUMEN MENSUAL

Antes de entregar cualquier resumen:

- [ ] **Ejecutar script único** `resumen-mensual-completo.sh`
- [ ] **Verificar que NO aparezcan** `⚠️ ALERTA: [Banco] sin registros`
- [ ] **Cross-check**: Total debe coincidir con suma manual
- [ ] **Sanity check**: ¿El monto es razonable vs mes anterior?

### 4. ALERTAS AUTOMÁTICAS

El script detecta:
- Bancos sin movimientos (sospechoso)
- Registros sin fecha (error de carga)
- Totales inconsistentes

### 5. VALIDACIÓN FINAL

**Antes de presentar resultados a Wally:**
1. Verificar que todos los bancos principales estén presentes
2. Confirmar que el total incluye todas las categorías esperadas
3. Si hay dudas → RE-RUN el script completo

## 🚨 NUNCA MÁS

- ~~Queries manuales~~ → **Script único**
- ~~Asumir completitud~~ → **Verificación obligatoria**
- ~~Reportar parciales~~ → **Datos completos o nada**

**Regla de oro:** Si el proceso no verifica por banco, NO ES CONFIABLE.