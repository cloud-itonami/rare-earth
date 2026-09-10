(ns cloud-itonami.rare-earth.desktop
  "Entry point for the shadow-cljs :app build (web/dist/js/main.js, loaded
  by web/index.html) — same mount pattern as murakumo-studio.desktop and
  cloud-itonami.public-malak.desktop."
  (:require [reagent.dom.client :as rdomc]
            [cloud-itonami.rare-earth.state :as state]
            [cloud-itonami.rare-earth.ui :as ui]))

(defonce root (atom nil))

(defn- mount! []
  (let [el (.getElementById js/document "app")]
    (when-not @root
      (reset! root (rdomc/create-root el)))
    (rdomc/render @root [ui/root])))

(defn init! []
  ;; data loads asynchronously into the reagent atom; ui/root derefs
  ;; state/state and re-renders on each swap (loading -> loaded/error).
  (state/load!)
  (mount!))
