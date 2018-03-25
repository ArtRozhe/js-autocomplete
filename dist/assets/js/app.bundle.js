var app=function(a){function e(n){if(o[n])return o[n].exports;var l=o[n]={i:n,l:!1,exports:{}};return a[n].call(l.exports,l,l.exports,e),l.l=!0,l.exports}var o={};return e.m=a,e.c=o,e.d=function(a,o,n){e.o(a,o)||Object.defineProperty(a,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(a){var o=a&&a.__esModule?function(){return a.default}:function(){return a};return e.d(o,"a",o),o},e.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},e.p="",e(e.s=6)}({6:function(a,e,o){"use strict";var n=o(7),l=function(a){return a&&a.__esModule?a:{default:a}}(n);o(8);var r=new window.LocalDataProvider({data:l.default.cities,useCache:!0}),i=new window.LocalDataProvider({data:l.default.groupedData,useCache:!0}),t=new window.LocalDataProvider({data:l.default.cities,useCache:!0}),d=new window.ApiDataProvider({apiPath:"http://localhost:3003/dataSet?search=",useCache:!0});new window.AutoComplete({containers:".auto-complete_ex-1",dataProvider:r}),new window.AutoComplete({containers:".auto-complete_ex-2",dataProvider:i,minChars:1,delay:50}),new window.AutoComplete({containers:".auto-complete_ex-3",dataProvider:t,minChars:1,delay:50,generateLayoutSuggestion:function(a,e){var o="",n=new RegExp("("+e.split(" ").join("|")+")","gi");return o=o+"<div>"+a.replace(n,'<span style="color: #FF5722;">$1</span>')+"</div>"}}),new window.AutoComplete({containers:".auto-complete_ex-4",dataProvider:d,minChars:1,delay:50})},7:function(a,e){a.exports={cities:["Abasto","Acassuso","Acebal","Acevedo","Adelia Maria","Agua de Oro","Albardon","Albarellos","Alberdi","Alberti","Aldo Bonzi","Alejandro Korn","Alicia","Allen","Almafuerte","Almagro","Almirante Brown","Alta Gracia","Alta Italia","Alvarez","Alvear","Anatuya","Angelica","Antonio Carboni","Apostoles","Arequito","Armstrong","Arrecifes","Arroyito","Arroyito","Arroyito Challaco","Arroyo Seco","Arteaga","Asamblea","Ascension","Avellaneda","Avellaneda","Ayacucho","Azara","Azul","Balcarce","Balnearia","Banda del Rio Sali","Bandera","Banfield","Baradero","Bariloche","Barrio Fisherton","Batan","Beccar","Belen de Escobar","Belgrano","Belgrano","Bell Ville","Bella Vista","Bella Vista","Benavidez","Berazategui","Berisso","Bernal","Bernardo Larroude","Bernasconi","Bigand","Bombal","Bordenave","Bosch","Bosques","Boulogne","Bovril","Bragado","Brandsen","Brinkmann","Buenos Aires","Burzaco","Bustinza","Caballito","Calderon","Caleta Olivia","Caleufu","Camilo Aldao","Campana","Canada de Gomez","Canada del Ucle","Canada Rosquin","Canals","Canning","Canuelas","Capilla del Monte","Capilla del Senor","Capitan Bermudez","Carhue","Carlos Casares","Carlos Pellegrini","Carlos Tejedor","Caseros","Casilda","Castelar","Castelli","Castillo","Catriel","Catrilo","Cavanagh","Centenario","Ceres","Cervantes","Chacabuco","Chacarita","Chajari","Charata","Chateaubriand","Chilecito","Chivilcoy","Choele Choel","Chorroarin","Cinco Saltos","Cipolletti","City Bell","Ciudad General Belgrano","Ciudadela","Claypole","Clorinda","Colon","Colon","Colonia Baron","Colonia Caroya","Colonia San Miguel Arcangel","Comodoro Rivadavia","Concepcion","Concepcion","Concordia","Constituyentes","Coronel Dorrego","Coronel Martinez de Hoz","Coronel Pringles","Corral de Bustos","Corralitos","Corrientes","Cosquin","Coy Aike","Cramer","Crespo","Cruz del Eje","Curuzu Cuatia","Cutral-Co","Darregueira","De Mayo","Del Campillo","Del Viso","Despenaderos","Devoto","Diaz","Diego de Alvear","Doblas","Dock Sud","Dolores","Don Bosco","Don Torcuato","Drabble","Eduardo Castex","El Calafate","El Dorado","El Hoyo","El Palomar","El Palomar","El Talar","El Trebol","Eldorado","Embalse","Empalme Lobos","Ensenada","Esperanza","Esquel","Esteban Echeverria","Ezeiza","Ezpeleta","Famailla","Fatima","Federal","Fernandez","Firmat","Florencio Varela","Florentino Ameghino","Flores","Floresta","Florida","Formosa","Francisco Alvarez","Franck","Fray Luis A. Beltran","Freyre","Frias","Funes","Gaiman","Galvez","Garin","Garupa","General Acha","General Alvear","General Cabrera","General Deheza","General Guido","General Juan Madariaga","General Lagos","General Las Heras","General Lavalle","General Mansilla","General Martin Miguel de Guemes","General Pacheco","General Paz","General Pico","General Roca","General Roca","General Rodriguez","General San Martin","General San Martin","General Viamonte","General Villegas","Germania","Glew","Gobernador Crespo","Gobernador Galvez","Godoy","Godoy Cruz","Gonzalez Catan","Gonzalez Moreno","Goya","Granadero Baigorria","Grand Bourg","Gualeguay","Guatrache","Guernica","Henderson","Hernando","Hersilia","Hilario","Hilario Ascasubi","Hipatia","Hipolito Yrigoyen","Huanchillas","Huanguelen","Huinca Renanco","Humahuaca","Hurlingham","Ibarlucea","Ibicuy","Independencia","Ingeniero Beaugey","Ingeniero Luiggi","Ingeniero Maschwitz","Intendente Alvear","Isidro Casanova","Ituzaingo","James Craik","Jauregui","Jeppener","Jesus Maria","Jose Leon Suarez","Jose Marmol","Juan Pujol","Justiniano Posse","La Banda","La Boca","La Calera","La Cumbre","La Falda","La Leonesa","La Lucila","La Madrid","La Pampa","La Para","La Paz","La Paz","La Plata","La Punta","La Rioja","La Tablada","La Union","La Violeta","Laborde","Laboulaye","Laferrere","Laguna Alsina","Lanus","Larroque","Las Catitas","Las Flores","Las Flores","Las Heras","Las Perdices","Las Rosas","Las Talitas","Las Varillas","Lavalle","Leandro N. Alem","Leones","Libertad","Lima","Liniers","Llavallol","Lobos","Lomas de Zamora","Lomas del Mirador","Longchamps","Los Antiguos","Los Cardales","Los Molinos","Los Polvorines","Luis Guillon","Lujan de Cuyo","Luque","Luzuriaga","Lynch","Macachin","Magdalena","Magdalena","Maggiolo","Maipu","Maipu","Manantial","Manfredi","Manuel J. Cobo","Maquinista Savio","Mar de Ajo","Mar del Plata","Mar del Tuyu","Marcos Juarez","Marcos Paz","Margarita","Maria Ignacia","Maria Juana","Mariano Acosta","Mariano J. Haedo","Mariano Moreno","Martinez","Matheu","Mayor Buratovich","Melincue","Mendiolaza","Mendoza","Mercedes","Mercedes","Merlo","Merlo","Minacar","Miramar","Miramar","Monje","Monte Hermoso","Monteros","Montserrat","Moreno","Moron","Morteros","Muniz","Munro","Navarro","Navarro","Necochea","Nogoya","Nordelta","Nunez","Obera","Oliva","Oliveros","Olivos","Oncativo","Open Door","Ordonez","Palermo","Palmira","Palpala","Partido de Jose C. Paz","Pasco","Paso del Rey","Paternal","Pavon","Pedernales","Pedro Luro","Pellegrini","Perez","Pergamino","Perico","Perito Moreno","Piamonte","Pico de Salamanca","Pico Truncado","Pigue","Pilar","Pilar","Pilar","Pinamar","Piquete Cabado","Platanos","Plaza Huincul","Plottier","Pontevedra","Portena","Posadas","Pozo del Molle","Presidente Derqui","Puan","Pueblo San Jose","Puerto Madryn","Puerto Rico","Pueyrredon","Punta Alta","Quilmes","Rada Tilly","Rafael Calzada","Rafael Castillo","Rafael Obligado","Rafaela","Ramallo","Ramos Mejia","Ranchos","Rancul","Ranelagh","Rawson","Rawson","Realico","Recoleta","Reconquista","Remedios de Escalada","Resistencia","Retiro","Rio Ceballos","Rio Colorado","Rio Grande","Rio Piedras","Rio Segundo","Rio Tercero","Rivadavia","Rivadavia","Rivadavia","Rocamora","Rodriguez Pena","Rojas","Roldan","Roque Perez","Rosario","Rosas","Rufino","Sacanta","Saenz Pena","Saladillo","Saladillo","Salguero","Salsipuedes","Salta","Salto","Salto Grande","Sampacho","San Andres","San Andres de Giles","San Antonio de Areco","San Antonio de Arredondo","San Antonio de Obligado","San Antonio de Padua","San Antonio Oeste","San Benito","San Bernardo","San Carlos de Bolivar","San Cayetano","San Clemente","San Cristobal","San Fernando","San Fernando del Valle de Catamarca","San Francisco","San Francisco de Santa Fe","San Francisco Solano","San Genaro","San Gregorio","San Guillermo","San Isidro","San Isidro","San Isidro de Lules","San Javier","San Jeronimo Norte","San Jorge","San Jose","San Jose de la Esquina","San Juan","San Justo","San Lorenzo","San Luis","San Manuel","San Martin","San Martin de las Escobas","San Miguel","San Miguel","San Miguel","San Miguel del Monte","San Nicolas","San Pedro","San Pedro","San Rafael","San Salvador","San Salvador","San Salvador de Jujuy","San Telmo","San Vicente","Sanchez","Santa Clara de Saguier","Santa Elena","Santa Fe","Santa Lucia","Santa Lucia","Santa Rita","Santa Rosa","Santa Teresita","Santiago del Estero","Santo Tome","Santos Lugares","Sarandi","Sarmiento","Sarmiento","Segui","Sierra de la Ventana","Sierra de los Padres","Sinsacate","Suipacha","Sunchales","Tablada","Tacuari","Tafi Viejo","Tandil","Tapalque","Tapiales","Temperley","Teodelina","Thames","Tigre","Tio Pujio","Todd","Tornquist","Tortuguitas","Tostado","Totoras","Trelew","Trenque Lauquen","Tres Arroyos","Trevelin","Tristan Suarez","Tunuyan","Tupungato","Turdera","Ucacha","Uriburu","Ushuaia","Valle Hermoso","Vedia","Veinticinco de Mayo","Veinticinco de Mayo","Venado Tuerto","Vera","Veronica","Viale","Viamonte","Vicente Lopez","Victoria","Victoria","Vicuna Mackenna","Viedma","Villa Aberastain","Villa Adelina","Villa Allende","Villa Alsina","Villa Amelia","Villa Angela","Villa Ballester","Villa Bosch","Villa Canas","Villa Carlos Paz","Villa Constitucion","Villa de Maria","Villa de Mayo","Villa del Parque","Villa Dolores","Villa Dominico","Villa Elisa","Villa General Belgrano","Villa Gesell","Villa Giardino","Villa Huidobro","Villa Insuperable","Villa La Angostura","Villa Las Rosas","Villa Lugano","Villa Luzuriaga","Villa Madero","Villa Maria Grande","Villa Media Agua","Villa Mercedes","Villa Mercedes","Villa Nueva","Villa Nueva","Villa Ocampo","Villa Paranacito","Villa Regina","Villa Robles","Villa Rosa","Villa Trinidad","Villa Urquiza","Villaguay","Vuelta de Obligado","Warnes","Wheelwright","Wilde","Winifreda","Yerba Buena","Zenon Pereyra"],groupedData:[{title:"A",data:["Ab","Abc","Abcd"]},{title:"B",data:["Bc","Bcd","Bcde"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]},{title:"A",data:["Ava","Aba","Ana"]},{title:"B",data:["Bva","Bba","Bna"]},{title:"C",data:["Cva","Cba","Cna"]}]}},8:function(a,e){}}).default;