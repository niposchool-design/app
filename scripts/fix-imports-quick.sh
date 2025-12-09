#!/bin/bash

# Correção de importações quebradas

# Fix SignUpPage.tsx - ainda com paths antigos
sed -i 's|from "../../contexts/AuthContext"|from "../../../../contexts/AuthContext"|g' src/features/shared/pages/auth/SignUpPage.tsx
sed -i 's|from "../../lib/constants/routes"|from "../../../../lib/constants/routes"|g' src/features/shared/pages/auth/SignUpPage.tsx
sed -i 's|from "../../components/shared/NipoCard"|from "../../../../components/shared/NipoCard"|g' src/features/shared/pages/auth/SignUpPage.tsx
sed -i 's|from "../../components/shared/NipoButton"|from "../../../../components/shared/NipoButton"|g' src/features/shared/pages/auth/SignUpPage.tsx
sed -i 's|from "../../components/shared/NipoInput"|from "../../../../components/shared/NipoInput"|g' src/features/shared/pages/auth/SignUpPage.tsx

# Fix DebugAuthPage.tsx  
sed -i 's|from "../../contexts/AuthContext"|from "../../../../contexts/AuthContext"|g' src/features/shared/pages/debug/DebugAuthPage.tsx
sed -i 's|from "../../lib/constants/routes"|from "../../../../lib/constants/routes"|g' src/features/shared/pages/debug/DebugAuthPage.tsx
sed -i 's|from "../../components/shared/NipoCard"|from "../../../../components/shared/NipoCard"|g' src/features/shared/pages/debug/DebugAuthPage.tsx
sed -i 's|from "../../components/shared/NipoButton"|from "../../../../components/shared/NipoButton"|g' src/features/shared/pages/debug/DebugAuthPage.tsx

echo "Importações corrigidas!"