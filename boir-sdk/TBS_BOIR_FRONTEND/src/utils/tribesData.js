const tribes = {
  0: 'Select',
  1: "Absentee-Shawnee Tribe of Indians of Oklahoma",
  2: "Agdaagux Tribe of King Cove",
  3: "Agua Caliente Band of Cahuilla Indians of the Agua Caliente Indian Reservation, California",
  4: "Ak-Chin Indian Community",
  5: "Akiachak Native Community",
  6: "Akiak Native Community",
  7: "Alabama-Coushatta Tribe of Texas",
  8: "Alabama-Quassarte Tribal Town",
  9: "Alatna Village",
  10: "Algaaciq Native Village (St. Mary's)",
  11: "Allakaket Village",
  12: "Alturas Indian Rancheria, California",
  13: "Alutiiq Tribe of Old Harbor",
  14: "Angoon Community Association",
  15: "Anvik Village",
  16: "Apache Tribe of Oklahoma",
  17: "Arctic Village (See Native Village of Venetie Tribal Government)",
  18: "Asa'carsarmiut Tribe",
  19: "Assiniboine & Sioux Tribes of the Fort Peck Indian Reservation, Montana",
  20: "Augustine Band of Cahuilla Indians, California",
  21: "Bad River Band of the Lake Superior Tribe of Chippewa Indians of the Bad River Reservation, Wisconsin",
  22: "Bay Mills Indian Community, Michigan",
  23: "Bear River Band of the Rohnerville Rancheria, California",
  24: "Beaver Village",
  25: "Berry Creek Rancheria of Maidu Indians of California",
  26: "Big Lagoon Rancheria, California",
  27: "Big Pine Paiute Tribe of the Owens Valley",
  28: "Big Sandy Rancheria of Western Mono Indians of California",
  29: "Big Valley Band of Pomo Indians of the Big Valley Rancheria, California",
  30: "Birch Creek Tribe",
  31: "Bishop Paiute Tribe",
  32: "Blackfeet Tribe of the Blackfeet Indian Reservation of Montana",
  33: "Blue Lake Rancheria, California",
  34: "Bridgeport Indian Colony",
  35: "Buena Vista Rancheria of Me-Wuk Indians of California",
  36: "Burns Paiute Tribe",
  37: "Cabazon Band of Mission Indians, California",
  38: "Cachil DeHe Band of Wintun Indians of the Colusa Indian Community of the Colusa Rancheria, California",
  39: "Caddo Nation of Oklahoma",
  40: "Cahto Tribe of the Laytonville Rancheria",
  41: "Cahuilla Band of Indians",
  42: "California Valley Miwok Tribe, California",
  43: "Campo Band of Diegueno Mission Indians of the Campo Indian Reservation, California",
  44: "Capitan Grande Band of Diegueno Mission Indians of California (Barona Group of Capitan Grande Band of Mission Indians of the Barona Reservation, California)",
  45: "Capitan Grande Band of Diegueno Mission Indians of California",
  46: "Capitan Grande Band of Diegueno Mission Indians of California: Viejas (Baron Long) Group of Capitan Grande Band of Mission Indians of the Viejas Reservation, California",
  47: "Catawba Indian Nation (aka Catawba Indian Tribe of South Carolina)",
  48: "Cayuga Nation",
  49: "Cedarville Rancheria, California",
  50: "Central Council of the Tlingit & Haida Indian Tribes",
  51: "Chalkyitsik Village",
  52: "Cheesh-Na Tribe",
  53: "Chemehuevi Indian Tribe of the Chemehuevi Reservation, California",
  54: "Cher-Ae Heights Indian Community of the Trinidad Rancheria, California",
  55: "Cherokee Nation",
  56: "Chevak Native Village",
  57: "Cheyenne and Arapaho Tribes, Oklahoma",
  58: "Cheyenne River Sioux Tribe of the Cheyenne River Reservation, South Dakota",
  59: "Chickahominy Indian Tribe - Eastern Division",
  60: "Chickahominy Indian Tribe",
  61: "Chickaloon Native Village",
  62: "Chicken Ranch Rancheria of Me-Wuk Indians of California",
  63: "Chignik Bay Tribal Council",
  64: "Chignik Lake Village",
  65: "Chilkat Indian Village (Klukwan)",
  66: "Chilkoot Indian Association (Haines)",
  67: "Chinik Eskimo Community (Golovin)",
  68: "Chippewa Cree Indians of the Rocky Boy's Reservation, Montana",
  69: "Chitimacha Tribe of Louisiana",
  70: "Chuloonawick Native Village",
  71: "Circle Native Community",
  72: "Citizen Potawatomi Nation, Oklahoma",
  73: "Cloverdale Rancheria of Pomo Indians of California",
  74: "Cocopah Tribe of Arizona",
  75: "Coeur D'Alene Tribe",
  76: "Cold Springs Rancheria of Mono Indians of California",
  77: "Colorado River Indian Tribes of the Colorado River Indian Reservation, Arizona and California",
  78: "Comanche Nation, Oklahoma",
  79: "Confederated Salish and Kootenai Tribes of the Flathead Reservation",
  80: "Confederated Tribes and Bands of the Yakama Nation",
  81: "Confederated Tribes of Siletz Indians of Oregon",
  82: "Confederated Tribes of the Chehalis Reservation",
  83: "Confederated Tribes of the Colville Reservation",
  84: "Confederated Tribes of the Coos, Lower Umpqua and Siuslaw Indians",
  85: "Confederated Tribes of the Goshute Reservation, Nevada and Utah",
  86: "Confederated Tribes of the Grand Ronde Community of Oregon",
  87: "Confederated Tribes of the Umatilla Indian Reservation",
  88: "Confederated Tribes of the Warm Springs Reservation of Oregon",
  89: "Coquille Indian Tribe",
  90: "Coushatta Tribe of Louisiana",
  91: "Cow Creek Band of Umpqua Tribe of Indians",
  92: "Cowlitz Indian Tribe",
  93: "Coyote Valley Band of Pomo Indians of California",
  94: "Craig Tribal Association",
  95: "Crow Creek Sioux Tribe of the Crow Creek Reservation, South Dakota",
  96: "Crow Tribe of Montana",
  97: "Curyung Tribal Council",
  98: "Delaware Nation, Oklahoma",
  99: "Delaware Tribe of Indians",
  100: "Douglas Indian Association",
  101: "Dry Creek Rancheria Band of Pomo Indians, California",
  102: "Duckwater Shoshone Tribe of the Duckwater Reservation, Nevada",
  103: "Eastern Band of Cherokee Indians",
  104: "Eastern Shawnee Tribe of Oklahoma",
  105: "Eastern Shoshone Tribe of the Wind River Reservation, Wyoming",
  106: "Egegik Village",
  107: "Eklutna Native Village",
  108: "Elem Indian Colony of Pomo Indians of the Sulphur Bank Rancheria, California",
  109: "Elk Valley Rancheria, California",
  110: "Ely Shoshone Tribe of Nevada",
  111: "Emmonak Village",
  112: "Enterprise Rancheria of Maidu Indians of California",
  113: "Evansville Village (aka Bettles Field)",
  114: "Ewiiaapaayp Band of Kumeyaay Indians, California",
  115: "Federated Indians of Graton Rancheria, California",
  116: "Flandreau Santee Sioux Tribe of South Dakota",
  117: "Forest County Potawatomi Community, Wisconsin",
  118: "Fort Belknap Indian Community of the Fort Belknap Reservation of Montana",
  119: "Fort Bidwell Indian Community of the Fort Bidwell Reservation of California",
  120: "Fort Independence Indian Community of Paiute Indians of the Fort Independence Reservation, California",
  121: "Fort McDermitt Paiute and Shoshone Tribes of the Fort McDermitt Indian Reservation, Nevada and Oregon",
  122: "Fort McDowell Yavapai Nation, Arizona",
  123: "Fort Mojave Indian Tribe of Arizona, California & Nevada",
  124: "Fort Sill Apache Tribe of Oklahoma",
  125: "Galena Village (aka Louden Village)",
  126: "Gila River Indian Community of the Gila River Indian Reservation, Arizona",
  127: "Grand Traverse Band of Ottawa and Chippewa Indians, Michigan",
  128: "Greenville Rancheria",
  129: "Grindstone Indian Rancheria of Wintun-Wailaki Indians of California",
  130: "Guidiville Rancheria of California",
  131: "Gulkana Village Council",
  132: "Habematolel Pomo of Upper Lake, California",
  133: "Hannahville Indian Community, Michigan",
  134: "Havasupai Tribe of the Havasupai Reservation, Arizona",
  135: "Healy Lake Village",
  136: "Ho-Chunk Nation of Wisconsin",
  137: "Hoh Indian Tribe",
  138: "Holy Cross Tribe",
  139: "Hoonah Indian Association",
  140: "Hoopa Valley Tribe, California",
  141: "Hopi Tribe of Arizona",
  142: "Hopland Band of Pomo Indians, California",
  143: "Houlton Band of Maliseet Indians",
  144: "Hualapai Indian Tribe of the Hualapai Indian Reservation, Arizona",
  145: "Hughes Village",
  146: "Huslia Village",
  147: "Hydaburg Cooperative Association",
  148: "Igiugig Village",
  149: "Iipay Nation of Santa Ysabel, California",
  150: "Inaja Band of Diegueno Mission Indians of the Inaja and Cosmit Reservation, California",
  151: "Inupiat Community of the Arctic Slope",
  152: "Ione Band of Miwok Indians of California",
  153: "Iowa Tribe of Kansas and Nebraska",
  154: "Iowa Tribe of Oklahoma",
  155: "Iqugmiut Traditional Council",
  156: "Ivanof Bay Tribe",
  157: "Jackson Band of Miwuk Indians",
  158: "Jamestown S'Klallam Tribe",
  159: "Jamul Indian Village of California",
  160: "Jena Band of Choctaw Indians",
  161: "Jicarilla Apache Nation, New Mexico",
  162: "Kaguyak Village",
  163: "Kaibab Band of Paiute Indians of the Kaibab Indian Reservation, Arizona",
  164: "Kaktovik Village (aka Barter Island)",
  165: "Kalispel Indian Community of the Kalispel Reservation",
  166: "Karuk Tribe",
  167: "Kashia Band of Pomo Indians of the Stewarts Point Rancheria, California",
  168: "Kasigluk Traditional Elders Council",
  169: "Kaw Nation, Oklahoma",
  170: "Kenaitze Indian Tribe",
  171: "Ketchikan Indian Community",
  172: "Keweenaw Bay Indian Community, Michigan",
  173: "Kialegee Tribal Town",
  174: "Kickapoo Traditional Tribe of Texas",
  175: "Kickapoo Tribe of Indians of the Kickapoo Reservation in Kansas",
  176: "Kickapoo Tribe of Oklahoma",
  177: "King Island Native Community",
  178: "King Salmon Tribe",
  179: "Kiowa Indian Tribe of Oklahoma",
  180: "Klamath Tribes",
  181: "Klawock Cooperative Association",
  182: "Kletsel Dehe Band of Wintun Indians",
  183: "Knik Tribe",
  184: "Koi Nation of Northern California",
  185: "Kokhanok Village",
  186: "Kootenai Tribe of Idaho",
  187: "Koyukuk Native Village",
  188: "La Jolla Band of Luiseno Indians, California",
  189: "La Posta Band of Diegueno Mission Indians of the La Posta Indian Reservation, California",
  190: "Lac Courte Oreilles Band of Lake Superior Chippewa Indians of Wisconsin",
  191: "Lac du Flambeau Band of Lake Superior Chippewa Indians of the Lac du Flambeau Reservation of Wisconsin",
  192: "Lac Vieux Desert Band of Lake Superior Chippewa Indians of Michigan",
  193: "Las Vegas Tribe of Paiute Indians of the Las Vegas Indian Colony, Nevada",
  194: "Levelock Village",
  195: "Lime Village",
  196: "Little River Band of Ottawa Indians, Michigan",
  197: "Little Shell Tribe of Chippewa Indians of Montana",
  198: "Little Traverse Bay Bands of Odawa Indians, Michigan",
  199: "Lone Pine Paiute-Shoshone Tribe",
  200: "Los Coyotes Band of Cahuilla and Cupeno Indians, California",
  201: "Lovelock Paiute Tribe of the Lovelock Indian Colony, Nevada",
  202: "Lower Brule Sioux Tribe of the Lower Brule Reservation, South Dakota",
  203: "Lower Elwha Tribal Community",
  204: "Lower Sioux Indian Community in the State of Minnesota",
  205: "Lummi Tribe of the Lummi Reservation",
  206: "Lytton Rancheria of California",
  207: "Makah Indian Tribe of the Makah Indian Reservation",
  208: "Manchester Band of Pomo Indians of the Manchester Rancheria, California",
  209: "Manley Hot Springs Village",
  210: "Manokotak Village",
  211: "Manzanita Band of Diegueno Mission Indians of the Manzanita Reservation, California",
  212: "Mashantucket Pequot Indian Tribe",
  213: "Mashpee Wampanoag Tribe",
  214: "Match-e-be-nash-she-wish Band of Pottawatomi Indians of Michigan",
  215: "McGrath Native Village",
  216: "Mechoopda Indian Tribe of Chico Rancheria, California",
  217: "Menominee Indian Tribe of Wisconsin",
  218: "Mentasta Traditional Council",
  219: "Mesa Grande Band of Diegueno Mission Indians of the Mesa Grande Reservation, California",
  220: "Mescalero Apache Tribe of the Mescalero Reservation, New Mexico",
  221: "Metlakatla Indian Community, Annette Island Reserve",
  222: "Miami Tribe of Oklahoma",
  223: "Miccosukee Tribe of Indians",
  224: "Middletown Rancheria of Pomo Indians of California",
  225: "Mi'kmaq Nation",
  226: "Minnesota Chippewa Tribe - Bois Forte Band (Nett Lake)",
  227: "Minnesota Chippewa Tribe - Fond du Lac Band",
  228: "Minnesota Chippewa Tribe - Grand Portage Band",
  229: "Minnesota Chippewa Tribe - Leech Lake Band",
  230: "Minnesota Chippewa Tribe - Mille Lacs Band",
  231: "Minnesota Chippewa Tribe - White Earth Band",
  232: "Minnesota Chippewa Tribe, Minnesota",
  233: "Mississippi Band of Choctaw Indians",
  234: "Moapa Band of Paiute Indians of the Moapa River Indian Reservation, Nevada",
  235: "Modoc Nation",
  236: "Mohegan Tribe of Indians of Connecticut",
  237: "Monacan Indian Nation",
  238: "Mooretown Rancheria of Maidu Indians of California",
  239: "Morongo Band of Mission Indians, California",
  240: "Muckleshoot Indian Tribe",
  241: "Naknek Native Village",
  242: "Nansemond Indian Nation",
  243: "Narragansett Indian Tribe",
  244: "Native Village of Afognak",
  245: "Native Village of Akhiok",
  246: "Native Village of Akutan",
  247: "Native Village of Aleknagik",
  248: "Native Village of Ambler",
  249: "Native Village of Atka",
  250: "Native Village of Atqasuk",
  251: "Native Village of Barrow Inupiat Traditional Government",
  252: "Native Village of Belkofski",
  253: "Native Village of Brevig Mission",
  254: "Native Village of Buckland",
  255: "Native Village of Cantwell",
  256: "Native Village of Chenega (aka Chanega)",
  257: "Native Village of Chignik Lagoon",
  258: "Native Village of Chitina",
  259: "Native Village of Chuathbaluk (Russian Mission, Kuskokwim)",
  260: "Native Village of Council",
  261: "Native Village of Deering",
  262: "Native Village of Diomede (aka Inalik)",
  263: "Native Village of Eagle",
  264: "Native Village of Eek",
  265: "Native Village of Ekuk",
  266: "Native Village of Ekwok",
  267: "Native Village of Elim",
  268: "Native Village of Eyak (Cordova)",
  269: "Native Village of False Pass",
  270: "Native Village of Fort Yukon",
  271: "Native Village of Gakona",
  272: "Native Village of Gambell",
  273: "Native Village of Georgetown",
  274: "Native Village of Goodnews Bay",
  275: "Native Village of Hamilton",
  276: "Native Village of Hooper Bay",
  277: "Native Village of Kanatak",
  278: "Native Village of Karluk",
  279: "Native Village of Kiana",
  280: "Native Village of Kipnuk",
  281: "Native Village of Kivalina",
  282: "Native Village of Kluti Kaah (aka Copper Center)",
  283: "Native Village of Kobuk",
  284: "Native Village of Kongiganak",
  285: "Native Village of Kotzebue",
  286: "Native Village of Koyuk",
  287: "Native Village of Kwigillingok",
  288: "Native Village of Kwinhagak (aka Quinhagak)",
  289: "Native Village of Larsen Bay",
  290: "Native Village of Marshall (aka Fortuna Ledge)",
  291: "Native Village of Mary's Igloo",
  292: "Native Village of Mekoryuk",
  293: "Native Village of Minto",
  294: "Native Village of Nanwalek (aka English Bay)",
  295: "Native Village of Napaimute",
  296: "Native Village of Napakiak",
  297: "Native Village of Napaskiak",
  298: "Native Village of Nelson Lagoon",
  299: "Native Village of Nightmute",
  300: "Native Village of Nikolski",
  301: "Native Village of Noatak",
  302: "Native Village of Nuiqsut (aka Nooiksut)",
  303: "Native Village of Nunam Iqua",
  304: "Native Village of Nunapitchuk",
  305: "Native Village of Ouzinkie",
  306: "Native Village of Paimiut",
  307: "Native Village of Perryville",
  308: "Native Village of Pilot Point",
  309: "Native Village of Point Hope",
  310: "Native Village of Point Lay",
  311: "Native Village of Port Graham",
  312: "Native Village of Port Heiden",
  313: "Native Village of Port Lions",
  314: "Native Village of Ruby",
  315: "Native Village of Saint Michael",
  316: "Native Village of Savoonga",
  317: "Native Village of Scammon Bay",
  318: "Native Village of Selawik",
  319: "Native Village of Shaktoolik",
  320: "Native Village of Shishmaref",
  321: "Native Village of Shungnak",
  322: "Native Village of Stevens",
  323: "Native Village of Tanacross",
  324: "Native Village of Tanana",
  325: "Native Village of Tatitlek",
  326: "Native Village of Tazlina",
  327: "Native Village of Teller",
  328: "Native Village of Tetlin",
  329: "Native Village of Tuntutuliak",
  330: "Native Village of Tununak",
  331: "Native Village of Tyonek",
  332: "Native Village of Unalakleet",
  333: "Native Village of Unga",
  334: "Native Village of Venetie Tribal Government (Arctic Village and Village of Venetie)",
  335: "Native Village of Wales",
  336: "Native Village of White Mountain",
  337: "Navajo Nation, Arizona, New Mexico &amp; Utah",
  338: "Nenana Native Association",
  339: "New Koliganek Village Council",
  340: "New Stuyahok Village",
  341: "Newhalen Village",
  342: "Newtok Village",
  343: "Nez Perce Tribe",
  344: "Nikolai Village",
  345: "Ninilchik Village",
  346: "Nisqually Indian Tribe",
  347: "Nome Eskimo Community",
  348: "Nondalton Village",
  349: "Nooksack Indian Tribe",
  350: "Noorvik Native Community",
  351: "Northern Arapaho Tribe of the Wind River Reservation, Wyoming",
  352: "Northern Cheyenne Tribe of the Northern Cheyenne Indian Reservation, Montana",
  353: "Northfork Rancheria of Mono Indians of California",
  354: "Northway Village",
  355: "Northwestern Band of the Shoshone Nation",
  356: "Nottawaseppi Huron Band of the Potawatomi, Michigan",
  357: "Nulato Village",
  358: "Nunakauyarmiut Tribe",
  359: "Oglala Sioux Tribe",
  360: "Ohkay Owingeh, New Mexico",
  361: "Omaha Tribe of Nebraska",
  362: "Oneida Indian Nation",
  363: "Oneida Nation",
  364: "Onondaga Nation",
  365: "Organized Village of Grayling (aka Holikachuk)",
  366: "Organized Village of Kake",
  367: "Organized Village of Kasaan",
  368: "Organized Village of Kwethluk",
  369: "Organized Village of Saxman",
  370: "Orutsararmiut Traditional Native Council",
  371: "Oscarville Traditional Village",
  372: "Otoe-Missouria Tribe of Indians, Oklahoma",
  373: "Ottawa Tribe of Oklahoma",
  374: "Paiute Indian Tribe of Utah (Cedar Band of Paiutes, Kanosh Band of Paiutes, Koosharem Band of Paiutes, Indian Peaks Band of Paiutes, and Shivwits Band of Paiutes)",
  375: "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada",
  376: "Pala Band of Mission Indians",
  377: "Pamunkey Indian Tribe",
  378: "Pascua Yaqui Tribe of Arizona",
  379: "Paskenta Band of Nomlaki Indians of California",
  380: "Passamaquoddy Tribe - Indian Township",
  381: "Passamaquoddy Tribe - Pleasant Point",
  382: "Passamaquoddy Tribe",
  383: "Pauloff Harbor Village",
  384: "Pauma Band of Luiseno Mission Indians of the Pauma &amp; Yuima Reservation, California",
  385: "Pawnee Nation of Oklahoma",
  386: "Pechanga Band of Indians",
  387: "Pedro Bay Village",
  388: "Penobscot Nation",
  389: "Peoria Tribe of Indians of Oklahoma",
  390: "Petersburg Indian Association",
  391: "Picayune Rancheria of Chukchansi Indians of California",
  392: "Pilot Station Traditional Village",
  393: "Pinoleville Pomo Nation, California",
  394: "Pit River Tribe, California",
  395: "Pitka's Point Traditional Council",
  396: "Platinum Traditional Village",
  397: "Poarch Band of Creek Indians",
  398: "Pokagon Band of Potawatomi Indians, Michigan and Indiana",
  399: "Ponca Tribe of Indians of Oklahoma",
  400: "Ponca Tribe of Nebraska",
  401: "Port Gamble S'Klallam Tribe",
  402: "Portage Creek Village (aka Ohgsenakale)",
  403: "Potter Valley Tribe, California",
  404: "Prairie Band Potawatomi Nation",
  405: "Prairie Island Indian Community in the State of Minnesota",
  406: "Pribilof Islands Aleut Communities",
  407: "Pueblo of Acoma, New Mexico",
  408: "Pueblo of Cochiti, New Mexico",
  409: "Pueblo of Isleta, New Mexico",
  410: "Pueblo of Jemez, New Mexico",
  411: "Pueblo of Laguna, New Mexico",
  412: "Pueblo of Nambe, New Mexico",
  413: "Pueblo of Picuris, New Mexico",
  414: "Pueblo of Pojoaque, New Mexico",
  415: "Pueblo of San Felipe, New Mexico",
  416: "Pueblo of San Ildefonso, New Mexico",
  417: "Pueblo of Sandia, New Mexico",
  418: "Pueblo of Santa Ana, New Mexico",
  419: "Pueblo of Santa Clara, New Mexico",
  420: "Pueblo of Taos, New Mexico",
  421: "Pueblo of Tesuque, New Mexico",
  422: "Pueblo of Zia, New Mexico",
  423: "Puyallup Tribe of the Puyallup Reservation",
  424: "Pyramid Lake Paiute Tribe of the Pyramid Lake Reservation, Nevada",
  425: "Qagan Tayagungin Tribe of Sand Point",
  426: "Qawalangin Tribe of Unalaska",
  427: "Quapaw Nation",
  428: "Quartz Valley Indian Community of the Quartz Valley Reservation of California",
  429: "Quechan Tribe of the Fort Yuma Indian Reservation, California &amp; Arizona",
  430: "Quileute Tribe of the Quileute Reservation",
  431: "Quinault Indian Nation",
  432: "Ramah Navajo Chapter of the Navajo Nation",
  433: "Ramona Band of Cahuilla, California",
  434: "Rampart Village",
  435: "Rappahannock Tribe, Inc.",
  436: "Red Cliff Band of Lake Superior Chippewa Indians of Wisconsin",
  437: "Red Lake Band of Chippewa Indians, Minnesota",
  438: "Redding Rancheria, California",
  439: "Redwood Valley or Little River Band of Pomo Indians of the Redwood Valley Rancheria California",
  440: "Reno-Sparks Indian Colony, Nevada",
  441: "Resighini Rancheria, California",
  442: "Rincon Band of Luiseno Mission Indians of the Rincon Reservation, California",
  443: "Robinson Rancheria",
  444: "Rosebud Sioux Tribe of the Rosebud Indian Reservation, South Dakota",
  445: "Round Valley Indian Tribes, Round Valley Reservation, California",
  446: "Sac &amp; Fox Nation of Missouri in Kansas and Nebraska",
  447: "Sac &amp; Fox Nation, Oklahoma",
  448: "Sac &amp; Fox Tribe of the Mississippi in Iowa",
  449: "Saginaw Chippewa Indian Tribe of Michigan",
  450: "Saint George Island (See Pribilof Islands Aleut Communities of St. Paul &amp; St. George Islands)",
  451: "Saint Paul Island (See Pribilof Islands Aleut Communities of St. Paul &amp; St. George Islands)",
  452: "Saint Regis Mohawk Tribe",
  453: "Salamatof Tribe",
  454: "Salt River Pima-Maricopa Indian Community of the Salt River Reservation, Arizona",
  455: "Samish Indian Nation",
  456: "San Carlos Apache Tribe of the San Carlos Reservation, Arizona",
  457: "San Juan Southern Paiute Tribe of Arizona",
  458: "San Pasqual Band of Diegueno Mission Indians of California",
  459: "Santa Rosa Band of Cahuilla Indians, California",
  460: "Santa Rosa Indian Community of the Santa Rosa Rancheria, California",
  461: "Santa Ynez Band of Chumash Mission Indians of the Santa Ynez Reservation, California",
  462: "Santee Sioux Nation, Nebraska",
  463: "Santo Domingo Pueblo",
  464: "Sauk-Suiattle Indian Tribe",
  465: "Sault Ste. Marie Tribe of Chippewa Indians, Michigan",
  466: "Scotts Valley Band of Pomo Indians of California",
  467: "Seldovia Village Tribe",
  468: "Seminole Tribe of Florida",
  469: "Seneca Nation of Indians",
  470: "Seneca-Cayuga Nation",
  471: "Shageluk Native Village",
  472: "Shakopee Mdewakanton Sioux Community of Minnesota",
  473: "Shawnee Tribe",
  474: "Sherwood Valley Rancheria of Pomo Indians of California",
  475: "Shingle Springs Band of Miwok Indians, Shingle Springs Rancheria (Verona Tract), California",
  476: "Shinnecock Indian Nation",
  477: "Shoalwater Bay Indian Tribe of the Shoalwater Bay Indian Reservation",
  478: "Shoshone-Bannock Tribes of the Fort Hall Reservation",
  479: "Shoshone-Paiute Tribes of the Duck Valley Reservation, Nevada",
  480: "Sisseton-Wahpeton Oyate of the Lake Traverse Reservation, South Dakota",
  481: "Sitka Tribe of Alaska",
  482: "Skagway Village",
  483: "Skokomish Indian Tribe",
  484: "Skull Valley Band of Goshute Indians of Utah",
  485: "Snoqualmie Indian Tribe",
  486: "Soboba Band of Luiseno Indians, California",
  487: "Sokaogon Chippewa Community, Wisconsin",
  488: "South Naknek Village",
  489: "Southern Ute Indian Tribe of the Southern Ute Reservation, Colorado",
  490: "Spirit Lake Tribe, North Dakota",
  491: "Spokane Tribe of the Spokane Reservation",
  492: "Squaxin Island Tribe of the Squaxin Island Reservation",
  493: "St. Croix Chippewa Indians of Wisconsin",
  494: "Standing Rock Sioux Tribe of North &amp; South Dakota",
  495: "Stebbins Community Association",
  496: "Stillaguamish Tribe of Indians of Washington",
  497: "Stockbridge Munsee Community, Wisconsin",
  498: "Summit Lake Paiute Tribe of Nevada",
  499: "Sun'aq Tribe of Kodiak",
  500: "Suquamish Indian Tribe of the Port Madison Reservation",
  501: "Susanville Indian Rancheria, California",
  502: "Swinomish Indian Tribal Community",
  503: "Sycuan Band of the Kumeyaay Nation",
  504: "Table Mountain Rancheria",
  505: "Takotna Village",
  506: "Tangirnaq Native Village",
  507: "Tejon Indian Tribe",
  508: "Telida Village",
  509: "Te-Moak Tribe of Western Shoshone Indians of Nevada (Four constituent bands: Battle Mountain Band; Elko Band; South Fork Band and Wells Band)",
  510: "The Chickasaw Nation",
  511: "The Choctaw Nation of Oklahoma",
  512: "The Muscogee (Creek) Nation",
  513: "The Osage Nation",
  514: "The Seminole Nation of Oklahoma",
  515: "Thlopthlocco Tribal Town",
  516: "Three Affiliated Tribes of the Fort Berthold Reservation, North Dakota",
  517: "Timbisha Shoshone Tribe",
  518: "Tohono O'odham Nation of Arizona",
  519: "Tolowa Dee-ni' Nation",
  520: "Tonawanda Band of Seneca",
  521: "Tonkawa Tribe of Indians of Oklahoma",
  522: "Tonto Apache Tribe of Arizona",
  523: "Torres Martinez Desert Cahuilla Indians, California",
  524: "Traditional Village of Togiak",
  525: "Tulalip Tribes of Washington",
  526: "Tule River Indian Tribe of the Tule River Reservation, California",
  527: "Tuluksak Native Community",
  528: "Tunica-Biloxi Indian Tribe",
  529: "Tuolumne Band of Me-Wuk Indians of the Tuolumne Rancheria of California",
  530: "Turtle Mountain Band of Chippewa Indians of North Dakota",
  531: "Tuscarora Nation",
  532: "Twenty-Nine Palms Band of Mission Indians of California",
  533: "Twin Hills Village",
  534: "Ugashik Village",
  535: "Umkumiut Native Village",
  536: "United Auburn Indian Community of the Auburn Rancheria of California",
  537: "United Keetoowah Band of Cherokee Indians in Oklahoma",
  538: "Upper Mattaponi Tribe",
  539: "Upper Sioux Community, Minnesota",
  540: "Upper Skagit Indian Tribe",
  541: "Ute Indian Tribe of the Uintah &amp; Ouray Reservation, Utah",
  542: "Ute Mountain Ute Tribe",
  543: "Utu Utu Gwaitu Paiute Tribe of the Benton Paiute Reservation, California",
  544: "Village of Alakanuk",
  545: "Village of Anaktuvuk Pass",
  546: "Village of Aniak",
  547: "Village of Atmautluak",
  548: "Village of Bill Moore's Slough",
  549: "Village of Chefornak",
  550: "Village of Clarks Point",
  551: "Village of Crooked Creek",
  552: "Village of Dot Lake",
  553: "Village of Iliamna",
  554: "Village of Kalskag",
  555: "Village of Kaltag",
  556: "Village of Kotlik",
  557: "Village of Lower Kalskag",
  558: "Village of Ohogamiut",
  559: "Village of Red Devil",
  560: "Village of Sleetmute",
  561: "Village of Solomon",
  562: "Village of Stony River",
  563: "Village of Venetie (See Native Village of Venetie Tribal Government)",
  564: "Village of Wainwright",
  565: "Walker River Paiute Tribe of the Walker River Reservation, Nevada",
  566: "Wampanoag Tribe of Gay Head (Aquinnah)",
  567: "Washoe Tribe of Nevada &amp; California (Carson Colony, Dresslerville Colony, Woodfords Community, Stewart Community, &amp; Washoe Ranches)",
  568: "White Mountain Apache Tribe of the Fort Apache Reservation, Arizona",
  569: "Wichita and Affiliated Tribes (Wichita, Keechi, Waco &amp; Tawakonie), Oklahoma",
  570: "Wilton Rancheria, California",
  571: "Winnebago Tribe of Nebraska",
  572: "Winnemucca Indian Colony of Nevada",
  573: "Wiyot Tribe, California",
  574: "Wrangell Cooperative Association",
  575: "Wyandotte Nation",
  576: "Yakutat Tlingit Tribe",
  577: "Yankton Sioux Tribe of South Dakota",
  578: "Yavapai-Apache Nation of the Camp Verde Indian Reservation, Arizona",
  579: "Yavapai-Prescott Indian Tribe",
  580: "Yerington Paiute Tribe of the Yerington Colony and Campbell Ranch, Nevada",
  581: "Yocha Dehe Wintun Nation, California",
  582: "Yomba Shoshone Tribe of the Yomba Reservation, Nevada",
  583: "Ysleta del Sur Pueblo",
  584: "Yuhaaviatam of San Manuel Nation",
  585: "Yupiit of Andreafski",
  586: "Yurok Tribe of the Yurok Reservation, California",
  587: "Zuni Tribe of the Zuni Reservation, New Mexico",
  588: "Other",
}

  export default tribes;