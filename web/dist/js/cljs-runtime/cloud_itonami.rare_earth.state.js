goog.provide('cloud_itonami.rare_earth.state');
goog.scope(function(){
  cloud_itonami.rare_earth.state.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof cloud_itonami !== 'undefined') && (typeof cloud_itonami.rare_earth !== 'undefined') && (typeof cloud_itonami.rare_earth.state !== 'undefined') && (typeof cloud_itonami.rare_earth.state.state !== 'undefined')){
} else {
cloud_itonami.rare_earth.state.state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"coverage","coverage",1606292651),null,new cljs.core.Keyword(null,"shinka","shinka",645911532),null,new cljs.core.Keyword(null,"stage-filter","stage-filter",1113343084),"all",new cljs.core.Keyword(null,"flow-filter","flow-filter",-1854633918),"all",new cljs.core.Keyword(null,"error","error",-978969032),null], null));
}
cloud_itonami.rare_earth.state.upper_re = RegExp("[A-Z]","g");
/**
 * camelCase JSON key -> kebab-case keyword (updatedAt -> :updated-at).
 *   Must be a global RegExp — a bare #"..." literal has no /g flag in CLJS,
 *   so String.replace would only rewrite the FIRST capital.
 */
cloud_itonami.rare_earth.state.kebab = (function cloud_itonami$rare_earth$state$kebab(s){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(s).replace(cloud_itonami.rare_earth.state.upper_re,(function (m){
return ["-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(m.toLowerCase())].join('');
})));
});
/**
 * JS value -> CLJS with recursive camelCase->kebab-case keywordization of
 *   map keys, so the ui ns can destructure (:display-name actor) etc.
 *   (Plain JS objects do not reduce-kv — walk own keys via goog.object.)
 */
cloud_itonami.rare_earth.state.__GT_clj = (function cloud_itonami$rare_earth$state$__GT_clj(v){
if(cljs.core.array_QMARK_(v)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cloud_itonami.rare_earth.state.__GT_clj,v);
} else {
if(cljs.core.object_QMARK_(v)){
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,k){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,cloud_itonami.rare_earth.state.kebab(k),(function (){var G__20110 = (v[k]);
return (cloud_itonami.rare_earth.state.__GT_clj.cljs$core$IFn$_invoke$arity$1 ? cloud_itonami.rare_earth.state.__GT_clj.cljs$core$IFn$_invoke$arity$1(G__20110) : cloud_itonami.rare_earth.state.__GT_clj.call(null, G__20110));
})());
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.seq(cloud_itonami.rare_earth.state.goog$module$goog$object.getKeys(v))));
} else {
return v;

}
}
});
/**
 * fetch + status guard + .json(), returning a JS Promise.
 */
cloud_itonami.rare_earth.state.get_json = (function cloud_itonami$rare_earth$state$get_json(url){
return fetch(url).then((function (res){
if(cljs.core.truth_(res.ok)){
return res.json();
} else {
return Promise.reject((new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1(url)," -> HTTP ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(res.status)].join(''))));
}
}));
});
/**
 * Same chain the Svelte app ran on mount: actors and flows come from the
 *   xrpc surface, the merged coverage snapshot from /api/rare-earth/coverage
 *   (identical last-write semantics: coverage object wins, actors/flows
 *   grafted on). /api/rare-earth/shinka loads independently; when absent the
 *   heartbeat panel simply does not render (the {#if shinka} branch of the
 *   original template).
 */
cloud_itonami.rare_earth.state.load_BANG_ = (function cloud_itonami$rare_earth$state$load_BANG_(){
Promise.all([cloud_itonami.rare_earth.state.get_json("/xrpc/com.etzhayyim.apps.rareEarth.coverage.listActors"),cloud_itonami.rare_earth.state.get_json("/xrpc/com.etzhayyim.apps.rareEarth.coverage.listFlows"),cloud_itonami.rare_earth.state.get_json("/api/rare-earth/coverage")]).then((function (parts){
var actors = new cljs.core.Keyword(null,"actors","actors",-1845636398).cljs$core$IFn$_invoke$arity$1(cloud_itonami.rare_earth.state.__GT_clj((parts[(0)])));
var flows = new cljs.core.Keyword(null,"flows","flows",-1369576628).cljs$core$IFn$_invoke$arity$1(cloud_itonami.rare_earth.state.__GT_clj((parts[(1)])));
var cov = cloud_itonami.rare_earth.state.__GT_clj((parts[(2)]));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cloud_itonami.rare_earth.state.state,cljs.core.assoc,new cljs.core.Keyword(null,"coverage","coverage",1606292651),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cov,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"actors","actors",-1845636398),actors,new cljs.core.Keyword(null,"flows","flows",-1369576628),flows], null)], 0)));
})).catch((function (e){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cloud_itonami.rare_earth.state.state,cljs.core.assoc,new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.ex_message(e));
}));

return cloud_itonami.rare_earth.state.get_json("/api/rare-earth/shinka").then((function (json){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cloud_itonami.rare_earth.state.state,cljs.core.assoc,new cljs.core.Keyword(null,"shinka","shinka",645911532),cloud_itonami.rare_earth.state.__GT_clj(json));
})).catch((function (_){
return null;
}));
});
cloud_itonami.rare_earth.state.set_stage_filter_BANG_ = (function cloud_itonami$rare_earth$state$set_stage_filter_BANG_(v){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cloud_itonami.rare_earth.state.state,cljs.core.assoc,new cljs.core.Keyword(null,"stage-filter","stage-filter",1113343084),v);
});
cloud_itonami.rare_earth.state.set_flow_filter_BANG_ = (function cloud_itonami$rare_earth$state$set_flow_filter_BANG_(v){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cloud_itonami.rare_earth.state.state,cljs.core.assoc,new cljs.core.Keyword(null,"flow-filter","flow-filter",-1854633918),v);
});

//# sourceMappingURL=cloud_itonami.rare_earth.state.js.map
