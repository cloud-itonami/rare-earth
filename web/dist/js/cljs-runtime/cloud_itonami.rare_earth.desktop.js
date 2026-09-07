goog.provide('cloud_itonami.rare_earth.desktop');
if((typeof cloud_itonami !== 'undefined') && (typeof cloud_itonami.rare_earth !== 'undefined') && (typeof cloud_itonami.rare_earth.desktop !== 'undefined') && (typeof cloud_itonami.rare_earth.desktop.root !== 'undefined')){
} else {
cloud_itonami.rare_earth.desktop.root = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
cloud_itonami.rare_earth.desktop.mount_BANG_ = (function cloud_itonami$rare_earth$desktop$mount_BANG_(){
var el = document.getElementById("app");
if(cljs.core.truth_(cljs.core.deref(cloud_itonami.rare_earth.desktop.root))){
} else {
cljs.core.reset_BANG_(cloud_itonami.rare_earth.desktop.root,reagent.dom.client.create_root(el));
}

return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cloud_itonami.rare_earth.desktop.root),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cloud_itonami.rare_earth.ui.root], null));
});
cloud_itonami.rare_earth.desktop.init_BANG_ = (function cloud_itonami$rare_earth$desktop$init_BANG_(){
cloud_itonami.rare_earth.state.load_BANG_();

return cloud_itonami.rare_earth.desktop.mount_BANG_();
});

//# sourceMappingURL=cloud_itonami.rare_earth.desktop.js.map
