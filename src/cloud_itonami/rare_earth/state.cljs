(ns cloud-itonami.rare-earth.state
  "App state for the rare-earth (rare-earth-ui-re4c0v26) appview UI.
  Ported 1:1 from the former
  appview/rare-earth-ui-re4c0v26/svelte/src/App.svelte — a single
  dashboard screen over the worker's xrpc/api endpoints (listActors,
  listFlows, coverage, shinka) with stage/flow filter selects.
  Single reagent atom, murakumo-studio構成."
  (:require [goog.object :as gobj]
            [reagent.core :as r]))

(defonce state
  (r/atom {:coverage     nil
           :shinka       nil
           :stage-filter "all"
           :flow-filter  "all"
           :error        nil}))

(def ^:private upper-re (js/RegExp "[A-Z]" "g"))

(defn- kebab
  "camelCase JSON key -> kebab-case keyword (updatedAt -> :updated-at).
  Must be a global RegExp — a bare #\"...\" literal has no /g flag in CLJS,
  so String.replace would only rewrite the FIRST capital."
  [s]
  (keyword (.replace (str s) upper-re
                     (fn [m] (str "-" (.toLowerCase m))))))

(defn ->clj
  "JS value -> CLJS with recursive camelCase->kebab-case keywordization of
  map keys, so the ui ns can destructure (:display-name actor) etc.
  (Plain JS objects do not reduce-kv — walk own keys via goog.object.)"
  [v]
  (cond
    (array? v)  (mapv ->clj v)
    (object? v) (persistent!
                  (reduce
                    (fn [m k] (assoc! m (kebab k) (->clj (unchecked-get v k))))
                    (transient {})
                    (seq (gobj/getKeys v))))
    :otherwise  v))

(defn- get-json
  "fetch + status guard + .json(), returning a JS Promise."
  [url]
  (-> (js/fetch url)
      (.then (fn [res]
               (if (.-ok res)
                 (.json res)
                 (js/Promise.reject
                   (js/Error. (str url " -> HTTP " (.-status res)))))))))

(defn load!
  "Same chain the Svelte app ran on mount: actors and flows come from the
  xrpc surface, the merged coverage snapshot from /api/rare-earth/coverage
  (identical last-write semantics: coverage object wins, actors/flows
  grafted on). /api/rare-earth/shinka loads independently; when absent the
  heartbeat panel simply does not render (the {#if shinka} branch of the
  original template)."
  []
  (-> (js/Promise.all
        #js [(get-json "/xrpc/com.etzhayyim.apps.rareEarth.coverage.listActors")
             (get-json "/xrpc/com.etzhayyim.apps.rareEarth.coverage.listFlows")
             (get-json "/api/rare-earth/coverage")])
      (.then
        (fn [parts]
          (let [actors (:actors (->clj (aget parts 0)))
                flows  (:flows  (->clj (aget parts 1)))
                cov    (->clj (aget parts 2))]
            (swap! state assoc :coverage (merge cov {:actors actors
                                                     :flows  flows})))))
      (.catch (fn [e] (swap! state assoc :error (ex-message e)))))
  (-> (get-json "/api/rare-earth/shinka")
      (.then (fn [json] (swap! state assoc :shinka (->clj json))))
      (.catch (fn [_] nil))))

(defn set-stage-filter! [v] (swap! state assoc :stage-filter v))
(defn set-flow-filter!  [v] (swap! state assoc :flow-filter v))
