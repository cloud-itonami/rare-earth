(ns cloud-itonami.rare-earth.ui
  "View tree for the rare-earth (rare-earth-ui-re4c0v26) appview.
  Ported 1:1 from the former
  appview/rare-earth-ui-re4c0v26/svelte/src/App.svelte (single dashboard
  screen). Structural chrome comes from appkit.core / kotoba-ui.core
  (murakumo-studio構成); panels are hand-rolled hiccup with the original
  CSS ported verbatim, mirroring cloud-itonami.public-malak.ui /
  cloud-itonami.app-itonami.ui."
  (:require [appkit.core :as shape]
            [clojure.string :as str]
            [cloud-itonami.rare-earth.state :as state]))

(def css-text
  "
.re4-app { min-height: 100vh; padding: 40px 20px 72px; font-family: \"IBM Plex Sans\", \"Segoe UI\", sans-serif; color: #ecfeff; background: radial-gradient(circle at top left, rgba(34, 197, 94, 0.2), transparent 28%), radial-gradient(circle at top right, rgba(244, 63, 94, 0.18), transparent 30%), linear-gradient(180deg, #082f49 0%, #071827 48%, #020617 100%); }
.re4-shell { max-width: 1380px; margin: 0 auto; }
.re4-hero { display: grid; grid-template-columns: 1.6fr 0.9fr; gap: 20px; align-items: end; margin-bottom: 24px; }
.re4-eyebrow { margin: 0 0 10px; color: #67e8f9; font-size: 0.85rem; letter-spacing: 0.18em; text-transform: uppercase; }
.re4-app h1, .re4-app h2, .re4-app p { margin: 0; }
.re4-app h1 { font-family: \"Space Grotesk\", \"IBM Plex Sans\", sans-serif; font-size: clamp(2rem, 4vw, 4.8rem); line-height: 0.94; max-width: 12ch; }
.re4-lede { margin-top: 14px; max-width: 62ch; color: #cbd5e1; line-height: 1.65; }
.re4-hero-meta { display: grid; gap: 12px; }
.re4-meta-card, .re4-panel, .re4-metrics article { background: rgba(8, 15, 29, 0.72); border: 1px solid rgba(125, 211, 252, 0.15); box-shadow: 0 20px 50px rgba(2, 6, 23, 0.28); backdrop-filter: blur(18px); }
.re4-meta-card { padding: 16px; border-radius: 18px; }
.re4-meta-card span { display: block; color: #67e8f9; font-size: 0.8rem; margin-bottom: 8px; }
.re4-meta-card strong { display: block; word-break: break-word; }
.re4-metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px; margin-bottom: 24px; }
.re4-metrics article { padding: 18px; border-radius: 18px; }
.re4-metrics span { display: block; color: #93c5fd; margin-bottom: 10px; }
.re4-metrics strong { font-size: 2rem; font-family: \"Space Grotesk\", sans-serif; }
.re4-grid { display: grid; grid-template-columns: 1.25fr 0.9fr; gap: 16px; margin-bottom: 16px; }
.re4-panel { border-radius: 24px; padding: 22px; min-width: 0; }
.re4-panel-head { display: flex; justify-content: space-between; gap: 12px; align-items: end; margin-bottom: 18px; }
.re4-panel-head p { max-width: 30ch; color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
.re4-bars, .re4-stack, .re4-flow-list { display: grid; gap: 12px; }
.re4-bar-row { display: grid; gap: 8px; }
.re4-bar-label { display: flex; justify-content: space-between; color: #cbd5e1; }
.re4-bar-track { height: 12px; border-radius: 999px; overflow: hidden; background: rgba(148, 163, 184, 0.16); }
.re4-bar-fill { height: 100%; border-radius: 999px; }
.re4-risk, .re4-flow-item, .re4-actor-card { padding: 14px; border-radius: 18px; background: rgba(15, 23, 42, 0.68); border: 1px solid rgba(148, 163, 184, 0.12); }
.re4-risk p { color: #cbd5e1; margin-top: 6px !important; line-height: 1.55; }
.re4-severity { display: inline-flex; padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.re4-severity-critical { background: rgba(244, 63, 94, 0.16); color: #fda4af; }
.re4-severity-high { background: rgba(249, 115, 22, 0.16); color: #fdba74; }
.re4-actor-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
.re4-mineral-list { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.re4-actor-top, .re4-actor-meta, .re4-flow-top { display: flex; justify-content: space-between; gap: 10px; }
.re4-actor-meta { color: #94a3b8; margin: 10px 0; font-size: 0.9rem; }
.re4-badge, .re4-flow-kind, .re4-flow-status { display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 999px; font-size: 0.76rem; background: rgba(56, 189, 248, 0.14); color: #7dd3fc; }
.re4-badge-expanded { background: rgba(250, 204, 21, 0.16); color: #fde68a; }
.re4-app code { display: block; font-family: \"IBM Plex Mono\", monospace; font-size: 0.76rem; color: #67e8f9; word-break: break-all; }
.re4-deps-line { margin-top: 10px !important; color: #94a3b8; font-size: 0.82rem; }
.re4-mineral-card { background: linear-gradient(180deg, rgba(12, 74, 110, 0.5), rgba(15, 23, 42, 0.78)); }
.re4-arrow { color: #67e8f9; }
.re4-flow-status-planned { background: rgba(250, 204, 21, 0.16); color: #fde68a; }
.re4-loading { min-height: 100vh; display: grid; place-items: center; font-family: \"Space Grotesk\", sans-serif; font-size: 1.4rem; }
.re4-toolbar { display: flex; margin-bottom: 14px; }
.re4-toolbar label { display: grid; gap: 6px; color: #94a3b8; font-size: 0.88rem; }
.re4-toolbar select { appearance: none; background: rgba(15, 23, 42, 0.92); color: #e2e8f0; border: 1px solid rgba(125, 211, 252, 0.18); border-radius: 12px; padding: 8px 10px; }
@media (max-width: 980px) { .re4-hero, .re4-grid { grid-template-columns: 1fr; } .re4-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); } .re4-panel-head { display: grid; } }
")

(def ^:private stage-color
  {"policy"               "#f97316"
   "finance"              "#14b8a6"
   "extraction"           "#84cc16"
   "separation"           "#38bdf8"
   "processing"           "#60a5fa"
   "magnet-manufacturing" "#f43f5e"
   "demand"               "#facc15"})

(defn- panel-head [title subtitle]
  [:div.re4-panel-head [:h2 title] [:p subtitle]])

(defn- hero [cov]
  [:section.re4-hero
   [:div
    [:p.re4-eyebrow "Rare Earth Coverage"]
    [:h1 "Actor DID registry for the current rare earth bottleneck map."]
    [:p.re4-lede
     "The appview fronts " [:code (:primary-actor-did cov)]
     " and tracks mining, separation, magnet, policy, finance, and demand actors as one flow system."]]
   [:div.re4-hero-meta
    [:div.re4-meta-card
     [:span "Updated"]
     [:strong (.toLocaleString (js/Date. (:updated-at cov)))]]
    [:div.re4-meta-card
     [:span "Appview DID"]
     [:strong (:appview-did cov)]]]])

(defn- metrics [m]
  [:section.re4-metrics
   [:article [:span "Actors"] [:strong (:actor-count m)]]
   [:article [:span "Flows"] [:strong (:flow-count m)]]
   [:article [:span "Jurisdictions"] [:strong (:jurisdiction-count m)]]
   [:article [:span "Diversification Projects"] [:strong (:active-diversification-projects m)]]
   [:article [:span "Mineral Registries"] [:strong (:mineral-count m)]]])

(defn- stage-coverage [items]
  [:article.re4-panel
   [panel-head "Stage Coverage"
    "Current registered actor spread by supply-chain stage."]
   (into [:div.re4-bars]
     (for [{:keys [stage count]} items]
       ^{:key stage}
       [:div.re4-bar-row
        [:div.re4-bar-label [:span stage] [:strong count]]
        [:div.re4-bar-track
         [:div.re4-bar-fill
          {:style {:width      (str (max 12 (* count 8)) "%")
                   :background (or (stage-color stage) "#94a3b8")}}]]]))])

(defn- bottlenecks [items]
  [:article.re4-panel
   [panel-head "Bottlenecks" "Highest-impact coverage and market risks."]
   (into [:div.re4-stack]
     (for [{:keys [title detail severity]} items]
       ^{:key title}
       [:div.re4-risk
        [:span {:class (str "re4-severity re4-severity-" severity)} severity]
        [:strong title]
        [:p detail]]))])

(defn- heartbeat-panel [{:keys [collections heartbeat]}]
  (let [{hb-mood    :mood
         hb-summary :summary
         actions    :actions} heartbeat]
    [:article.re4-panel
     [panel-head "Heartbeat / Shinka"
      "Cadence-driven coverage evolution state for this appview."]
     (into [:div.re4-stack
            [:div.re4-risk
             [:span.re4-severity.re4-severity-high hb-mood]
             [:strong hb-summary]
             [:p (str/join " / " collections)]]]
       (for [a actions]
         ^{:key (str (:action a) "-" (:ts a))}
         [:div.re4-flow-item
          [:div.re4-flow-top
           [:span.re4-flow-kind (:action a)]
           [:span.re4-flow-status (or (:mood a) "steady")]]
          [:strong (or (:summary a) (:reason a) "heartbeat action")]]))]))

(defn- minerals [items]
  [:article.re4-panel
   [panel-head "Mineral DID Registry"
    "Tungsten, antimony, gallium, germanium, graphite, and rare-earth dependency nodes."]
   (into [:div {:class "re4-actor-list re4-mineral-list"}]
     (for [{:keys [did display-name priority deps key-sectors coverage]} items]
       ^{:key did}
       [:div {:class "re4-actor-card re4-mineral-card"}
        [:div.re4-actor-top
         [:strong display-name]
         [:span {:class (str "re4-badge re4-badge-" coverage)} coverage]]
        [:div.re4-actor-meta
         [:span (str "P" priority)]
         [:span (str/join " / " key-sectors)]]
        [:code did]
        [:p.re4-deps-line (str (count deps) " deps")]]))])

(defn- unique-values [items k]
  (distinct (map k items)))

(defn- filter-select [label-text options current on-change]
  [:div.re4-toolbar
   [:label
    [:span label-text]
    (into [:select {:value     current
                    :on-change #(on-change (.. % -target -value))}]
      (for [v (cons "all" options)]
        ^{:key v} [:option {:value v} v]))]])

(defn- actor-panel [cov stage-filter]
  (let [items (:actors cov)]
    [:article.re4-panel
     [panel-head "Priority Actors" "Registered mitama DIDs across the backbone."]
     [filter-select "Stage"
      (unique-values items :stage) stage-filter
      state/set-stage-filter!]
     (into [:div.re4-actor-list]
       (for [actor (filter #(or (= stage-filter "all")
                                (= (:stage %) stage-filter)) items)]
         ^{:key (:did actor)}
         [:div.re4-actor-card
          [:div.re4-actor-top
           [:strong (:display-name actor)]
           [:span.re4-badge (:jurisdiction actor)]]
          [:div.re4-actor-meta
           [:span (:stage actor)]
           [:span (str "P" (:priority actor))]]
          [:code (:did actor)]
          [:p.re4-deps-line (str (count (:deps actor)) " deps")]]))]))

(defn- flow-panel [cov flow-filter]
  (let [items (:flows cov)]
    [:article.re4-panel
     [panel-head "Backbone Flows"
      "Active and planned edges across policy, capital, and material movement."]
     [filter-select "Kind"
      (unique-values items :kind) flow-filter
      state/set-flow-filter!]
     (into [:div.re4-flow-list]
       (for [flow (filter #(or (= flow-filter "all")
                               (= (:kind %) flow-filter)) items)]
         ^{:key (str (:source flow) "->" (:target flow) ":" (:kind flow))}
         [:div.re4-flow-item
          [:div.re4-flow-top
           [:span.re4-flow-kind (:kind flow)]
           [:span {:class (str "re4-flow-status re4-flow-status-" (:status flow))}
            (:status flow)]]
          [:strong (:source flow)]
          [:span.re4-arrow "→"]
          [:strong (:target flow)]]))]))

;; root

(defn root []
  (let [{:keys [coverage shinka stage-filter flow-filter error]} @state/state]
    [:div
     [:style css-text]
     (cond
       error
       [shape/panel
        [:main.re4-app
         [:div.re4-loading "Failed to load rare earth coverage: " error]]]

       (nil? coverage)
       [shape/panel
        [:main.re4-app
         [:div.re4-loading "Loading rare earth coverage..."]]]

       :else
       [shape/panel
        [:main.re4-app
         [:div.re4-shell
          [hero coverage]
          [metrics (:metrics coverage)]
          [:section.re4-grid
           [stage-coverage (:stage-coverage coverage)]
           [bottlenecks (:bottlenecks coverage)]]
          [:section.re4-grid
           (when shinka [heartbeat-panel shinka])
           [minerals (:minerals coverage)]
           [actor-panel coverage stage-filter]
           [flow-panel coverage flow-filter]]]]])]))
