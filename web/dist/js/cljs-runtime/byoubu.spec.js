goog.provide('byoubu.spec');
/**
 * Every backdrop names the same nine roles. A fixed vocabulary is what lets
 *   `byoubu.plate` build a plate for any entry without special-casing, and
 *   what lets two backdrops be compared.
 */
byoubu.spec.required_palette_keys = new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sky-zenith","sky-zenith",-20065151),new cljs.core.Keyword(null,"sky-mid","sky-mid",106630624),new cljs.core.Keyword(null,"sky-horizon","sky-horizon",-157541617),new cljs.core.Keyword(null,"haze","haze",-1024870708),new cljs.core.Keyword(null,"ridge-far","ridge-far",762525090),new cljs.core.Keyword(null,"ridge-near","ridge-near",1102584738),new cljs.core.Keyword(null,"dune-lit","dune-lit",790638115),new cljs.core.Keyword(null,"dune-shadow","dune-shadow",423450330),new cljs.core.Keyword(null,"star","star",279424429)], null);
byoubu.spec.required_scene_keys = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sky","sky",1271496862),new cljs.core.Keyword(null,"atmosphere","atmosphere",523254734),new cljs.core.Keyword(null,"terrain","terrain",704966005),new cljs.core.Keyword(null,"camera","camera",-1190348585),new cljs.core.Keyword(null,"grade","grade",2117054771)], null);
byoubu.spec.textures = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"moderate","moderate",-1039163165),null,new cljs.core.Keyword(null,"calm","calm",-533989756),null,new cljs.core.Keyword(null,"busy","busy",-328286801),null], null), null);
byoubu.spec.missing = (function byoubu$spec$missing(m,ks){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__22994_SHARP_){
return cljs.core.contains_QMARK_(m,p1__22994_SHARP_);
}),ks);
});
/**
 * Vector of problem descriptions for one backdrop; empty means valid.
 */
byoubu.spec.problems = (function byoubu$spec$problems(backdrop){
var id = new cljs.core.Keyword("byoubu","id","byoubu/id",459733156).cljs$core$IFn$_invoke$arity$1(backdrop);
var palette = new cljs.core.Keyword("byoubu","palette","byoubu/palette",851879321).cljs$core$IFn$_invoke$arity$1(backdrop);
var band = new cljs.core.Keyword("byoubu","content-band","byoubu/content-band",-1665630238).cljs$core$IFn$_invoke$arity$1(backdrop);
var scene = new cljs.core.Keyword("byoubu","scene","byoubu/scene",1831525071).cljs$core$IFn$_invoke$arity$1(backdrop);
var pfx = [cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([id], 0)),": "].join('');
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22995(s__22996){
return (new cljs.core.LazySeq(null,(function (){
var s__22996__$1 = s__22996;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22996__$1);
if(temp__5825__auto__){
var s__22996__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22996__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22996__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22998 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22997 = (0);
while(true){
if((i__22997 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__22997);
if((cljs.core.get.cljs$core$IFn$_invoke$arity$2(backdrop,k) == null)){
cljs.core.chunk_append(b__22998,[pfx,"missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__23107 = (i__22997 + (1));
i__22997 = G__23107;
continue;
} else {
var G__23108 = (i__22997 + (1));
i__22997 = G__23108;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22998),byoubu$spec$problems_$_iter__22995(cljs.core.chunk_rest(s__22996__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22998),null);
}
} else {
var k = cljs.core.first(s__22996__$2);
if((cljs.core.get.cljs$core$IFn$_invoke$arity$2(backdrop,k) == null)){
return cljs.core.cons([pfx,"missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__22995(cljs.core.rest(s__22996__$2)));
} else {
var G__23110 = cljs.core.rest(s__22996__$2);
s__22996__$1 = G__23110;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("byoubu","id","byoubu/id",459733156),new cljs.core.Keyword("byoubu","title","byoubu/title",1943539519),new cljs.core.Keyword("byoubu","summary","byoubu/summary",1753941440),new cljs.core.Keyword("byoubu","tags","byoubu/tags",-743870735),new cljs.core.Keyword("byoubu","seed","byoubu/seed",841916191),new cljs.core.Keyword("byoubu","texture","byoubu/texture",1576630445),new cljs.core.Keyword("byoubu","accent","byoubu/accent",553460268),new cljs.core.Keyword("byoubu","palette","byoubu/palette",851879321),new cljs.core.Keyword("byoubu","content-band","byoubu/content-band",-1665630238),new cljs.core.Keyword("byoubu","scene","byoubu/scene",1831525071)], null));
})(),(((id instanceof cljs.core.Keyword))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"id must be a keyword"].join('')], null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.int_QMARK_(new cljs.core.Keyword("byoubu","seed","byoubu/seed",841916191).cljs$core$IFn$_invoke$arity$1(backdrop)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"seed must be an integer \u2014 a backdrop nobody can re-render ","is an asset, not a spec"].join('')], null)),((cljs.core.contains_QMARK_(byoubu.spec.textures,new cljs.core.Keyword("byoubu","texture","byoubu/texture",1576630445).cljs$core$IFn$_invoke$arity$1(backdrop)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"texture must be one of ",clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.sort.cljs$core$IFn$_invoke$arity$1(byoubu.spec.textures))].join('')], null)),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__23004(s__23005){
return (new cljs.core.LazySeq(null,(function (){
var s__23005__$1 = s__23005;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__23005__$1);
if(temp__5825__auto__){
var s__23005__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23005__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__23005__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__23007 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__23006 = (0);
while(true){
if((i__23006 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__23006);
cljs.core.chunk_append(b__23007,[pfx,"palette missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__23112 = (i__23006 + (1));
i__23006 = G__23112;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23007),byoubu$spec$problems_$_iter__23004(cljs.core.chunk_rest(s__23005__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23007),null);
}
} else {
var k = cljs.core.first(s__23005__$2);
return cljs.core.cons([pfx,"palette missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__23004(cljs.core.rest(s__23005__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(byoubu.spec.missing(palette,byoubu.spec.required_palette_keys));
})(),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__23009(s__23010){
return (new cljs.core.LazySeq(null,(function (){
var s__23010__$1 = s__23010;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__23010__$1);
if(temp__5825__auto__){
var s__23010__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23010__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__23010__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__23012 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__23011 = (0);
while(true){
if((i__23011 < size__5479__auto__)){
var vec__23014 = cljs.core._nth(c__5478__auto__,i__23011);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23014,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23014,(1),null);
if((byoubu.color.hex__GT_rgb(v) == null)){
cljs.core.chunk_append(b__23012,[pfx,"palette ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)," is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v], 0))].join(''));

var G__23114 = (i__23011 + (1));
i__23011 = G__23114;
continue;
} else {
var G__23115 = (i__23011 + (1));
i__23011 = G__23115;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23012),byoubu$spec$problems_$_iter__23009(cljs.core.chunk_rest(s__23010__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23012),null);
}
} else {
var vec__23018 = cljs.core.first(s__23010__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23018,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23018,(1),null);
if((byoubu.color.hex__GT_rgb(v) == null)){
return cljs.core.cons([pfx,"palette ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)," is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v], 0))].join(''),byoubu$spec$problems_$_iter__23009(cljs.core.rest(s__23010__$2)));
} else {
var G__23116 = cljs.core.rest(s__23010__$2);
s__23010__$1 = G__23116;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(palette);
})(),((cljs.core.contains_QMARK_(palette,new cljs.core.Keyword("byoubu","accent","byoubu/accent",553460268).cljs$core$IFn$_invoke$arity$1(backdrop)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"accent ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("byoubu","accent","byoubu/accent",553460268).cljs$core$IFn$_invoke$arity$1(backdrop)], 0))," is not a palette key"].join('')], null)),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__23022(s__23023){
return (new cljs.core.LazySeq(null,(function (){
var s__23023__$1 = s__23023;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__23023__$1);
if(temp__5825__auto__){
var s__23023__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23023__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__23023__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__23025 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__23024 = (0);
while(true){
if((i__23024 < size__5479__auto__)){
var vec__23026 = cljs.core._nth(c__5478__auto__,i__23024);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23026,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23026,(1),null);
if((!(cljs.core.contains_QMARK_(palette,k)))){
cljs.core.chunk_append(b__23025,[pfx,"content-band references unknown palette key ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__23117 = (i__23024 + (1));
i__23024 = G__23117;
continue;
} else {
var G__23118 = (i__23024 + (1));
i__23024 = G__23118;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23025),byoubu$spec$problems_$_iter__23022(cljs.core.chunk_rest(s__23023__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23025),null);
}
} else {
var vec__23029 = cljs.core.first(s__23023__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23029,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23029,(1),null);
if((!(cljs.core.contains_QMARK_(palette,k)))){
return cljs.core.cons([pfx,"content-band references unknown palette key ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__23022(cljs.core.rest(s__23023__$2)));
} else {
var G__23119 = cljs.core.rest(s__23023__$2);
s__23023__$1 = G__23119;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(band);
})(),(function (){var total = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,0.0,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,band));
var drift = (total - 1.0);
var drift__$1 = (((drift < (0)))?(- drift):drift);
if((drift__$1 > 0.001)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"content-band weights sum to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total),", not 1.0"].join('')], null);
} else {
return null;
}
})(),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__23032(s__23033){
return (new cljs.core.LazySeq(null,(function (){
var s__23033__$1 = s__23033;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__23033__$1);
if(temp__5825__auto__){
var s__23033__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23033__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__23033__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__23035 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__23034 = (0);
while(true){
if((i__23034 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__23034);
cljs.core.chunk_append(b__23035,[pfx,"scene missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__23120 = (i__23034 + (1));
i__23034 = G__23120;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23035),byoubu$spec$problems_$_iter__23032(cljs.core.chunk_rest(s__23033__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23035),null);
}
} else {
var k = cljs.core.first(s__23033__$2);
return cljs.core.cons([pfx,"scene missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__23032(cljs.core.rest(s__23033__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(byoubu.spec.missing(scene,byoubu.spec.required_scene_keys));
})(),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__23037(s__23038){
return (new cljs.core.LazySeq(null,(function (){
var s__23038__$1 = s__23038;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__23038__$1);
if(temp__5825__auto__){
var s__23038__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23038__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__23038__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__23040 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__23039 = (0);
while(true){
if((i__23039 < size__5479__auto__)){
var vec__23044 = cljs.core._nth(c__5478__auto__,i__23039);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23044,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23044,(1),null);
if((byoubu.color.hex__GT_rgb(new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)) == null)){
cljs.core.chunk_append(b__23040,[pfx,"measured ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tier)," content-color is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)], 0))].join(''));

var G__23121 = (i__23039 + (1));
i__23039 = G__23121;
continue;
} else {
var G__23122 = (i__23039 + (1));
i__23039 = G__23122;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23040),byoubu$spec$problems_$_iter__23037(cljs.core.chunk_rest(s__23038__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23040),null);
}
} else {
var vec__23048 = cljs.core.first(s__23038__$2);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23048,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23048,(1),null);
if((byoubu.color.hex__GT_rgb(new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)) == null)){
return cljs.core.cons([pfx,"measured ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tier)," content-color is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)], 0))].join(''),byoubu$spec$problems_$_iter__23037(cljs.core.rest(s__23038__$2)));
} else {
var G__23123 = cljs.core.rest(s__23038__$2);
s__23038__$1 = G__23123;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.select_keys(new cljs.core.Keyword("byoubu","measured","byoubu/measured",-610808208).cljs$core$IFn$_invoke$arity$1(backdrop),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"plate","plate",-1920178141),new cljs.core.Keyword(null,"poster","poster",-1616913550)], null)));
})(),(function (){var f = byoubu.facts.derive_facts(backdrop);
var ink = new cljs.core.Keyword("byoubu.facts","ink","byoubu.facts/ink",567836213).cljs$core$IFn$_invoke$arity$1(f);
var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__23051(s__23052){
return (new cljs.core.LazySeq(null,(function (){
var s__23052__$1 = s__23052;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__23052__$1);
if(temp__5825__auto__){
var s__23052__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23052__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__23052__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__23054 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__23053 = (0);
while(true){
if((i__23053 < size__5479__auto__)){
var vec__23059 = cljs.core._nth(c__5478__auto__,i__23053);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23059,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23059,(1),null);
var r = byoubu.color.contrast_ratio(ink,c);
if(((function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})() < byoubu.facts.wcag_aa_body)){
cljs.core.chunk_append(b__23054,[pfx,"recommended ink ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ink)," on the ",cljs.core.name(tier)," content band ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)," has contrast ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(r),", below AA body ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(byoubu.facts.wcag_aa_body)].join(''));

var G__23124 = (i__23053 + (1));
i__23053 = G__23124;
continue;
} else {
var G__23125 = (i__23053 + (1));
i__23053 = G__23125;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23054),byoubu$spec$problems_$_iter__23051(cljs.core.chunk_rest(s__23052__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23054),null);
}
} else {
var vec__23062 = cljs.core.first(s__23052__$2);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23062,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23062,(1),null);
var r = byoubu.color.contrast_ratio(ink,c);
if(((function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})() < byoubu.facts.wcag_aa_body)){
return cljs.core.cons([pfx,"recommended ink ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ink)," on the ",cljs.core.name(tier)," content band ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)," has contrast ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(r),", below AA body ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(byoubu.facts.wcag_aa_body)].join(''),byoubu$spec$problems_$_iter__23051(cljs.core.rest(s__23052__$2)));
} else {
var G__23126 = cljs.core.rest(s__23052__$2);
s__23052__$1 = G__23126;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(byoubu.facts.tier_colors(backdrop));
})()], 0)));
});
byoubu.spec.valid_QMARK_ = (function byoubu$spec$valid_QMARK_(backdrop){
return cljs.core.empty_QMARK_(byoubu.spec.problems(backdrop));
});

//# sourceMappingURL=byoubu.spec.js.map
