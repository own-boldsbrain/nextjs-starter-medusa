# UX/UI Backlog - YSH Marketplace 360º

**Framework**: RICE (Reach × Impact × Confidence ÷ Effort)  
**Status**: October 6, 2025  
**Target**: 80% coverage by Sprint 5  

---

## 🎯 Scoring System

### RICE Formula

- **Reach**: % of users affected (0-10)
- **Impact**: Business value (0-3): 0.25=low, 0.5=medium, 1=high, 2=massive, 3=critical
- **Confidence**: Data certainty (0-100%): 50%=low, 80%=medium, 100%=high
- **Effort**: Person-weeks (0.5-20)

**Score = (Reach × Impact × Confidence) / Effort**

---

## 🔥 Priority 1 - Critical Path (RICE > 50)

### 1. Journey Calculator Widget (ROI/Savings)

**RICE Score**: 95.0  

- Reach: 10 (100% of discovery users)
- Impact: 3 (critical for conversion)
- Confidence: 100%
- Effort: 3 weeks

**User Story**:  
Como usuário descobrindo energia solar, quero calcular minha economia mensal para decidir se investimento é viável.

**Acceptance Criteria**:

- [ ] Input: conta mensal (R$) ou consumo (kWh)
- [ ] Output: economia mensal, ROI, payback
- [ ] Suporte para tarifas: Convencional, Branca, Azul, Verde
- [ ] Mobile-first, loading states, error handling
- [ ] Telemetria: `calculate_roi_[classe]`
- [ ] Data-testid: `roi-calculator`, `roi-result`, `roi-input-bill`

**Dependencies**:

- API: `/api/calculate-savings` (YSH_backend)
- AI Agent: `sizing/calculate_system_size.py` (YSH_ai-geovisio)

**Components**:

- `<ROICalculatorWidget />` - Main container
- `<BillInput />` - Input field with validation
- `<SavingsBreakdown />` - Results visualization
- `<TariffSelector />` - Dropdown B1/B2/B3/A

---

### 2. System Configurator (Kit Builder)

**RICE Score**: 80.0  

- Reach: 9 (90% of qualified leads)
- Impact: 3 (critical for cart conversion)
- Confidence: 100%
- Effort: 4 weeks

**User Story**:  
Como usuário qualificado, quero configurar um sistema fotovoltaico personalizado baseado no meu perfil de consumo.

**Acceptance Criteria**:

- [ ] Step 1: Perfil de consumo (upload fatura ou manual)
- [ ] Step 2: Tipo de instalação (telhado/laje/solo)
- [ ] Step 3: Seleção de equipamentos (painéis/inversores/acessórios)
- [ ] Step 4: Review e add to cart
- [ ] OCR de fatura (integração com Vision API)
- [ ] Recomendação automática de kits
- [ ] Comparador de equipamentos (lado a lado)
- [ ] Telemetria: `configure_system_[classe]`, `add_to_cart_[classe]`
- [ ] Data-testid: `configurator-wizard`, `configurator-step-{1-4}`

**Dependencies**:

- API: `/api/products/kits` (Medusa catalog)
- API: `/api/sizing/recommend` (YSH_backend)
- AI Agent: `sizing/dimensioning_agent.py` (YSH_ai-geovisio)
- OCR: `solar_vision/ocr_fatura.py` (YSH_ai-geovisio)

**Components**:

- `<SystemConfiguratorWizard />` - Multi-step wizard
- `<ConsumptionProfiler />` - Step 1 (OCR + manual)
- `<RoofAssessment />` - Step 2 (type/area/orientation)
- `<EquipmentSelector />` - Step 3 (kits/components)
- `<ConfigurationReview />` - Step 4 (summary + CTA)

---

### 3. Financing Simulator

**RICE Score**: 75.0  

- Reach: 8 (80% need financing)
- Impact: 3 (critical for purchase)
- Confidence: 100%
- Effort: 3 weeks

**User Story**:  
Como usuário configurando sistema, quero simular financiamento para entender parcelas e condições.

**Acceptance Criteria**:

- [ ] Input: CAPEX, entrada (%), prazo (meses)
- [ ] Output: parcela mensal, juros totais, comparação com conta atual
- [ ] Suporte PRONAF (B2 rural), leasing, PPA
- [ ] Pré-aprovação de crédito (integração parceiro)
- [ ] Telemetria: `simulate_financing_[classe]`, `request_credit_[classe]`
- [ ] Data-testid: `financing-simulator`, `financing-result`

**Dependencies**:

- API: `/api/financing/simulate` (YSH_backend)
- API: `/api/financing/pre-approval` (parceiro externo)

**Components**:

- `<FinancingSimulator />` - Main container
- `<LoanCalculator />` - Calculator inputs
- `<InstallmentBreakdown />` - Results table
- `<CreditPreApprovalForm />` - Application form

---

### 4. Product Comparison Table

**RICE Score**: 60.0  

- Reach: 7 (70% compare products)
- Impact: 2 (high impact on decision)
- Confidence: 100%
- Effort: 2 weeks

**User Story**:  
Como usuário avaliando equipamentos, quero comparar especificações lado a lado para escolher melhor opção.

**Acceptance Criteria**:

- [ ] Comparar até 4 produtos simultaneamente
- [ ] Atributos: potência, eficiência, garantia, preço, ROI
- [ ] Filtros: marca, potência, preço, certificação
- [ ] Ordenação: preço, popularidade, ROI
- [ ] Telemetria: `compare_products_[categoria]`, `select_product_[handle]`
- [ ] Data-testid: `comparison-table`, `comparison-product-{1-4}`

**Dependencies**:

- API: `/api/products` (Medusa catalog)
- Data: `catalog/panels.json`, `catalog/inverters.json` (YSH_backend)

**Components**:

- `<ProductComparisonTable />` - Main table
- `<ComparisonRow />` - Attribute row
- `<ProductSelector />` - Product picker
- `<ComparisonActions />` - Add to cart/remove

---

### 5. Journey Stage Tracker

**RICE Score**: 55.0  

- Reach: 9 (90% use journey pages)
- Impact: 1 (high for engagement)
- Confidence: 100%
- Effort: 1.5 weeks

**User Story**:  
Como usuário navegando jornada, quero visualizar meu progresso e próximos passos.

**Acceptance Criteria**:

- [ ] Visualização de 5 estágios: discover, configure, finance, homologate, post-sale
- [ ] Status: pending, in-progress, completed
- [ ] Ações contextuais por estágio (CTA dinâmico)
- [ ] Persistência de progresso (localStorage + DB)
- [ ] Telemetria: `view_journey_[classe]`, `complete_stage_[stage]`
- [ ] Data-testid: `journey-tracker`, `journey-stage-{stage}`

**Dependencies**:

- API: `/api/users/journey-progress` (YSH_backend)
- Data: `journeys.json` (YSH_storefront)

**Components**:

- `<JourneyStageTracker />` - Progress bar
- `<StageCard />` - Individual stage
- `<StageActions />` - Context actions
- `<ProgressPersistence />` - Save/load state

---

## 🟡 Priority 2 - High Impact (RICE 30-50)

### 6. Tariff Comparison Widget

**RICE Score**: 48.0  

- Reach: 6 (60% consider tariff change)
- Impact: 2 (high impact on B1 Branca)
- Confidence: 100%
- Effort: 2.5 weeks

**User Story**:  
Como usuário B1, quero comparar tarifas Convencional vs Branca para otimizar economia.

**Acceptance Criteria**:

- [ ] Input: curva de consumo horária
- [ ] Output: economia por tarifa, recomendação
- [ ] Visualização: gráfico ponta vs fora-ponta
- [ ] Badge: "Otimizado para Tarifa Branca"
- [ ] Telemetria: `compare_tariffs_[classe]`, `select_tariff_[tipo]`
- [ ] Data-testid: `tariff-comparison`, `tariff-recommendation`

**Dependencies**:

- API: `/api/tariffs/compare` (YSH_backend)
- AI Agent: `generation-vs-consumption/tariff_optimizer.py` (YSH_ai-geovisio)

**Components**:

- `<TariffComparisonWidget />` - Main container
- `<HourlyConsumptionChart />` - Visualization
- `<TariffRecommendation />` - Result card

---

### 7. Installation Timeline Tracker

**RICE Score**: 45.0  

- Reach: 8 (80% track installation)
- Impact: 1.5 (medium-high engagement)
- Confidence: 100%
- Effort: 2.5 weeks

**User Story**:  
Como cliente pós-compra, quero acompanhar status de instalação e homologação em tempo real.

**Acceptance Criteria**:

- [ ] Milestones: compra confirmada, instalação agendada, instalação concluída, documentação enviada, homologação aprovada
- [ ] Status: pending, in-progress, completed, blocked
- [ ] Notificações push/email em mudanças
- [ ] Upload de documentos (fotos, ART, projeto)
- [ ] Chat com suporte técnico
- [ ] Telemetria: `track_installation_[milestone]`, `upload_document_[type]`
- [ ] Data-testid: `installation-tracker`, `milestone-{name}`

**Dependencies**:

- API: `/api/orders/installation-status` (YSH_backend)
- API: `/api/upload/documents` (YSH_backend)

**Components**:

- `<InstallationTimelineTracker />` - Main timeline
- `<MilestoneCard />` - Individual milestone
- `<DocumentUpload />` - File upload
- `<SupportChat />` - Chat widget

---

### 8. Energy Monitoring Dashboard

**RICE Score**: 42.0  

- Reach: 7 (70% use dashboard)
- Impact: 2 (high for retention)
- Confidence: 100%
- Effort: 3 weeks

**User Story**:  
Como cliente pós-instalação, quero monitorar geração, consumo e economia em tempo real.

**Acceptance Criteria**:

- [ ] Visualização: geração hoje/mês, consumo, economia
- [ ] Gráficos: histórico 30 dias, comparação com conta anterior
- [ ] ROI tracker: investimento vs economia acumulada
- [ ] Alertas: baixa geração, anomalias
- [ ] Integração com inversor (API fabricante)
- [ ] Telemetria: `view_dashboard_[classe]`, `track_savings_[periodo]`
- [ ] Data-testid: `energy-dashboard`, `generation-chart`, `savings-tracker`

**Dependencies**:

- API: `/api/monitoring/generation` (YSH_backend)
- API: Inverter APIs (Growatt, Fronius, SMA)
- AI Agent: `generation-vs-consumption/anomaly_detector.py` (YSH_ai-geovisio)

**Components**:

- `<EnergyMonitoringDashboard />` - Main dashboard
- `<GenerationChart />` - Real-time chart
- `<SavingsTracker />` - ROI progress
- `<AnomalyAlerts />` - Alert system

---

### 9. Remote Location Matcher

**RICE Score**: 40.0  

- Reach: 5 (50% B1 without roof)
- Impact: 3 (critical for remote generation)
- Confidence: 80%
- Effort: 3 weeks

**User Story**:  
Como usuário B1 sem telhado adequado, quero encontrar locais remotos disponíveis para geração.

**Acceptance Criteria**:

- [ ] Busca por CEP/região
- [ ] Visualização: mapa com locais disponíveis
- [ ] Filtros: potência disponível, taxa de transmissão, distância
- [ ] Reserva de cota (slot booking)
- [ ] Telemetria: `search_remote_locations`, `reserve_slot_[location]`
- [ ] Data-testid: `location-matcher`, `location-map`, `location-card`

**Dependencies**:

- API: `/api/remote-generation/locations` (YSH_backend)
- Maps: Google Maps API

**Components**:

- `<RemoteLocationMatcher />` - Main container
- `<LocationMap />` - Interactive map
- `<LocationCard />` - Location details
- `<SlotBooking />` - Reservation form

---

### 10. Multi-UC Credit Distributor

**RICE Score**: 38.0  

- Reach: 4 (40% condominiums)
- Impact: 3 (critical for multi-UC)
- Confidence: 80%
- Effort: 3.5 weeks

**User Story**:  
Como síndico de condomínio, quero configurar distribuição de créditos entre unidades consumidoras.

**Acceptance Criteria**:

- [ ] Input: lista de UCs com consumo
- [ ] Configuração: % distribuição por UC
- [ ] Simulação: créditos mensais por UC
- [ ] Aprovação: assinaturas digitais proprietários
- [ ] Telemetria: `configure_multi_uc`, `approve_distribution_[uc]`
- [ ] Data-testid: `credit-distributor`, `uc-list`, `distribution-config`

**Dependencies**:

- API: `/api/multi-uc/distribution` (YSH_backend)
- E-signature: DocuSign API

**Components**:

- `<MultiUCCreditDistributor />` - Main container
- `<UCList />` - UC management
- `<DistributionConfigurator />` - % allocation
- `<ApprovalFlow />` - Signature workflow

---

## 🟢 Priority 3 - Medium Impact (RICE 15-30)

### 11. Demand Charge Optimizer (Grupo A)

**RICE Score**: 28.0  

- Reach: 2 (20% industrial)
- Impact: 3 (critical for A)
- Confidence: 100%
- Effort: 2 weeks

**User Story**:  
Como gestor industrial (Grupo A), quero otimizar demanda contratada para reduzir custos.

**Acceptance Criteria**:

- [ ] Input: demanda contratada atual, curva de carga
- [ ] Output: demanda otimizada, economia mensal
- [ ] Simulação: solar + baterias para resposta a demanda
- [ ] Análise fator de potência
- [ ] Telemetria: `optimize_demand_[tarifa]`, `simulate_battery_addon`
- [ ] Data-testid: `demand-optimizer`, `demand-result`

**Dependencies**:

- API: `/api/grupo-a/demand-optimizer` (YSH_backend)
- AI Agent: `sizing/industrial_optimizer.py` (YSH_ai-geovisio)

**Components**:

- `<DemandChargeOptimizer />` - Main calculator
- `<LoadCurveAnalyzer />` - Curve visualization
- `<BatteryRecommendation />` - Addon suggestion

---

### 12. Subsidy Eligibility Checker (PRONAF)

**RICE Score**: 25.0  

- Reach: 3 (30% B2 rural)
- Impact: 2.5 (high for rural)
- Confidence: 100%
- Effort: 1.5 weeks

**User Story**:  
Como produtor rural (B2), quero verificar elegibilidade para subsídios PRONAF.

**Acceptance Criteria**:

- [ ] Input: DAP, área rural, atividade agrícola
- [ ] Output: elegibilidade, linhas disponíveis, taxas
- [ ] Formulário de aplicação online
- [ ] Telemetria: `check_pronaf_eligibility`, `apply_pronaf_[linha]`
- [ ] Data-testid: `pronaf-checker`, `pronaf-result`

**Dependencies**:

- API: `/api/financing/pronaf-eligibility` (YSH_backend)
- External: Banco do Brasil API

**Components**:

- `<SubsidyEligibilityChecker />` - Checker form
- `<PRONAFApplication />` - Application form
- `<EligibilityResult />` - Result card

---

### 13. Cooperative Member Manager

**RICE Score**: 22.0  

- Reach: 2 (20% cooperatives)
- Impact: 2.5 (high for shared)
- Confidence: 100%
- Effort: 2 weeks

**User Story**:  
Como gestor de cooperativa, quero gerenciar membros e suas cotas de geração.

**Acceptance Criteria**:

- [ ] CRUD de membros (nome, UC, consumo)
- [ ] Alocação de cotas (% geração)
- [ ] Dashboard de créditos por membro
- [ ] Relatórios mensais
- [ ] Telemetria: `manage_cooperative_members`, `allocate_credits_[member]`
- [ ] Data-testid: `member-manager`, `member-list`, `credit-allocation`

**Dependencies**:

- API: `/api/cooperatives/members` (YSH_backend)

**Components**:

- `<CooperativeMemberManager />` - Main manager
- `<MemberList />` - Member CRUD
- `<CreditAllocation />` - Quota allocation
- `<MemberDashboard />` - Individual view

---

### 14. PPA Proposal Generator

**RICE Score**: 20.0  

- Reach: 3 (30% prefer OPEX)
- Impact: 2 (medium-high)
- Confidence: 100%
- Effort: 3 weeks

**User Story**:  
Como cliente empresarial, quero avaliar modelo PPA (OPEX) vs compra (CAPEX).

**Acceptance Criteria**:

- [ ] Input: consumo, prazo contrato (anos)
- [ ] Output: tarifa PPA, comparação com distribuidora
- [ ] Simulação: economia acumulada 10/15/20 anos
- [ ] Proposta comercial (PDF download)
- [ ] Telemetria: `request_ppa_proposal`, `compare_ppa_vs_capex`
- [ ] Data-testid: `ppa-generator`, `ppa-comparison`

**Dependencies**:

- API: `/api/financing/ppa-proposal` (YSH_backend)

**Components**:

- `<PPAProposalGenerator />` - Main form
- `<PPAComparator />` - CAPEX vs OPEX
- `<ProposalDownload />` - PDF generator

---

### 15. Loyalty Program Widget

**RICE Score**: 18.0  

- Reach: 7 (70% post-sale)
- Impact: 1 (medium retention)
- Confidence: 80%
- Effort: 3 weeks

**User Story**:  
Como cliente pós-instalação, quero acumular pontos e resgatar benefícios.

**Acceptance Criteria**:

- [ ] Pontos: instalação, referência, compra adicional
- [ ] Resgates: desconto expansão, baterias, EV charger
- [ ] Gamificação: badges, tiers (bronze/prata/ouro)
- [ ] Referral program: compartilhar link
- [ ] Telemetria: `redeem_loyalty_points`, `refer_friend`
- [ ] Data-testid: `loyalty-widget`, `points-balance`, `rewards-catalog`

**Dependencies**:

- API: `/api/loyalty/points` (YSH_backend)

**Components**:

- `<LoyaltyProgramWidget />` - Main widget
- `<PointsBalance />` - Points display
- `<RewardsCatalog />` - Redemption options
- `<ReferralLink />` - Share widget

---

## 🔵 Priority 4 - Low Impact (RICE < 15)

### 16. Sustainability Report Generator

**RICE Score**: 12.0  

- Reach: 3 (30% B3 enterprises)
- Impact: 1 (low impact)
- Confidence: 100%
- Effort: 2 weeks

**User Story**:  
Como empresa, quero gerar relatórios de sustentabilidade para comunicação institucional.

**Acceptance Criteria**:

- [ ] Métricas: CO2 evitado, árvores equivalentes, carros off-road
- [ ] Período: mensal, anual, desde instalação
- [ ] Formato: PDF, imagem para redes sociais
- [ ] Branding: logo empresa + YSH
- [ ] Telemetria: `generate_sustainability_report_[periodo]`
- [ ] Data-testid: `sustainability-report`, `report-download`

**Dependencies**:

- API: `/api/monitoring/sustainability-metrics` (YSH_backend)

**Components**:

- `<SustainabilityReportGenerator />` - Main form
- `<MetricsVisualization />` - Charts
- `<ReportExport />` - PDF/image export

---

### 17. Roof Assessment Tool (Visual)

**RICE Score**: 10.0  

- Reach: 5 (50% uncertain about roof)
- Impact: 1 (medium guidance)
- Confidence: 50%
- Effort: 4 weeks

**User Story**:  
Como usuário descobrindo solar, quero avaliar visualmente meu telhado para viabilidade.

**Acceptance Criteria**:

- [ ] Upload foto telhado
- [ ] Análise: área disponível, orientação, sombreamento
- [ ] Output: viabilidade (sim/não/talvez), capacidade (kWp)
- [ ] Agendamento visita técnica se necessário
- [ ] Telemetria: `assess_roof_visual`, `schedule_site_visit`
- [ ] Data-testid: `roof-assessment`, `roof-upload`, `assessment-result`

**Dependencies**:

- API: `/api/roof-assessment/analyze` (YSH_backend)
- AI: `solar_vision/roof_analyzer.py` (YSH_ai-geovisio)

**Components**:

- `<RoofAssessmentTool />` - Main tool
- `<RoofImageUpload />` - Photo upload
- `<AssessmentResult />` - Analysis result
- `<SiteVisitScheduler />` - Booking form

---

### 18. Battery Backup Configurator

**RICE Score**: 8.0  

- Reach: 2 (20% need backup)
- Impact: 2 (high upsell)
- Confidence: 50%
- Effort: 3 weeks

**User Story**:  
Como cliente com sistema solar, quero adicionar baterias para backup noturno/emergencial.

**Acceptance Criteria**:

- [ ] Input: potência crítica, autonomia desejada (horas)
- [ ] Output: capacidade bateria (kWh), custo, ROI
- [ ] Simulação: economia com tarifa branca + bateria
- [ ] Telemetria: `configure_battery_addon`, `add_battery_to_cart`
- [ ] Data-testid: `battery-configurator`, `battery-recommendation`

**Dependencies**:

- API: `/api/products/batteries` (Medusa catalog)
- AI: `sizing/battery_sizer.py` (YSH_ai-geovisio)

**Components**:

- `<BatteryBackupConfigurator />` - Main configurator
- `<CriticalLoadSelector />` - Load selection
- `<BatteryRecommendation />` - Size + cost

---

## 📊 Summary Stats

| Priority | Count | Total RICE | Avg RICE | Total Effort (weeks) |
|----------|-------|-----------|----------|---------------------|
| P1 (>50) | 5 | 408.0 | 81.6 | 14.5 |
| P2 (30-50) | 5 | 213.0 | 42.6 | 14.0 |
| P3 (15-30) | 5 | 123.0 | 24.6 | 12.0 |
| P4 (<15) | 3 | 30.0 | 10.0 | 9.0 |
| **Total** | **18** | **774.0** | **43.0** | **49.5** |

**Team Capacity**: 4 developers × 4 weeks/sprint = 16 person-weeks/sprint  
**Sprints Required**: 49.5 / 16 = **3.1 sprints (~4 sprints)**

---

## 🎯 Sprint Breakdown

### Sprint 4 (P1 Critical Path)

- Journey Calculator Widget (3w)
- System Configurator (4w)
- Financing Simulator (3w)
- Product Comparison Table (2w)
- Journey Stage Tracker (1.5w)

**Total**: 13.5 weeks (prioritize parallelization)

### Sprint 5 (P2 High Impact)

- Tariff Comparison Widget (2.5w)
- Installation Timeline Tracker (2.5w)
- Energy Monitoring Dashboard (3w)
- Remote Location Matcher (3w)
- Multi-UC Credit Distributor (3.5w)

**Total**: 14.5 weeks

### Sprint 6 (P3 Medium Impact)

- Demand Charge Optimizer (2w)
- Subsidy Eligibility Checker (1.5w)
- Cooperative Member Manager (2w)
- PPA Proposal Generator (3w)
- Loyalty Program Widget (3w)

**Total**: 11.5 weeks

### Sprint 7 (P4 Low Impact + Polish)

- Sustainability Report Generator (2w)
- Roof Assessment Tool (4w)
- Battery Backup Configurator (3w)

**Total**: 9 weeks

---

## 🔗 Integration Dependencies

### Backend APIs (YSH_backend)

- `/api/calculate-savings` - ROI calculator
- `/api/sizing/recommend` - System sizing
- `/api/financing/simulate` - Loan calculator
- `/api/tariffs/compare` - Tariff comparison
- `/api/monitoring/generation` - Energy data
- `/api/orders/installation-status` - Installation tracker
- `/api/remote-generation/locations` - Remote locations
- `/api/multi-uc/distribution` - Credit distribution
- `/api/grupo-a/demand-optimizer` - Demand optimizer
- `/api/financing/pronaf-eligibility` - PRONAF checker
- `/api/cooperatives/members` - Cooperative manager
- `/api/financing/ppa-proposal` - PPA generator
- `/api/loyalty/points` - Loyalty program

### AI Agents (YSH_ai-geovisio)

- `sizing/calculate_system_size.py` - System dimensioning
- `sizing/dimensioning_agent.py` - Smart recommendations
- `generation-vs-consumption/tariff_optimizer.py` - Tariff optimization
- `generation-vs-consumption/anomaly_detector.py` - Monitoring alerts
- `solar_vision/ocr_fatura.py` - Bill OCR
- `solar_vision/roof_analyzer.py` - Roof assessment
- `sizing/industrial_optimizer.py` - Industrial sizing
- `sizing/battery_sizer.py` - Battery sizing

### External APIs

- Google Maps API - Location mapping
- DocuSign API - E-signatures
- Banco do Brasil API - PRONAF
- Inverter APIs (Growatt, Fronius, SMA) - Monitoring
- Payment Gateway - Financing partners

---

## 🏆 Success Metrics

### Conversion Funnel

- Discovery → Configure: 40% (target)
- Configure → Cart: 60% (target)
- Cart → Purchase: 30% (target)
- Overall: 7.2% (discovery → purchase)

### Engagement

- Calculator usage: 80% of visitors
- Configurator completion: 50% of starters
- Dashboard daily active: 40% of customers

### Business

- AOV (Average Order Value): +25% with upsells
- Financing approval rate: 70%
- NPS: 50+ (target)

---

**Document Version**: 1.0.0  
**Last Updated**: October 6, 2025  
**Next Review**: End of Sprint 4
