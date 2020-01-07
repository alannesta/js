var sampleData = `
    <script>
var matchStats = [[[144,77,'Brescia','Lazio','05/01/2020 06:30:00','05/01/2020 00:00:00',6,'FT','1 : 1','1 : 2',,,'1 : 2','Italy','Italy']
, [[[18,[['Mario Balotelli','Stefano Sabelli','goal','(1-0)',,18,33799,283348]
],[],1,0]
,[35,[['Andrea Cistana',,'yellow',,,35,255504,0]
],[],1,0]
,[39,[['Andrea Cistana',,'red',,,39,255504,0]
],[],1,0]
,[42,[['Ernesto Torregrossa','Massimiliano Mangraviti','subst',,,42,95795,300754]
],[['Ciro Immobile',,'penalty-goal','(1-1)','Pen.',42,70141,0]
],1,1]
,[43,[['Sandro Tonali',,'yellow',,,43,343501,0]
],[],1,0]
,[45,[['Nikolas Spalek','Mattia Viviani','subst',,,45,339507,389132]
],[],1,0]
,[47,[['Mario Balotelli',,'yellow',,,47,33799,0]
],[],1,0]
,[56,[],[['Stefan Radu',,'yellow',,,56,21234,0]
],0,1]
,[57,[['Dimitri Bisoli',,'yellow',,,57,96183,0]
],[['Marco Parolo',,'yellow',,,57,26587,0]
],1,1]
,[59,[],[['Stefan Radu','Jony','subst',,,59,21234,294140]
,['Marco Parolo','Danilo Cataldi','subst',,,59,26587,118147]
],0,1]
,[65,[],[['Jony',,'yellow',,,65,294140,0]
],0,1]
,[72,[],[['Danilo Cataldi',,'yellow',,,72,118147,0]
],0,1]
,[77,[],[['Senad Lulic','André Anderson','subst',,,77,26168,382237]
],0,1]
,[81,[['Sandro Tonali','Alessandro Semprini','subst',,,81,343501,295473]
],[],1,0]
,[86,[['Jhon Chancellor',,'yellow',,,86,96526,0]
],[],1,0]
,[90,[],[['Ciro Immobile','Felipe Caicedo','goal','(1-2)',,90,70141,22466]
],0,1]
]]
, [[144,'Brescia',6.41357142857143,[[['blocked_scoring_att',[1]],['accurate_pass',[250]],['att_miss_left',[2]],['won_contest',[4]],['att_sv_high_centre',[1]],['ontarget_scoring_att',[3]],['total_scoring_att',[6]],['total_throws',[14]],['aerial_won',[7]],['total_pass',[327]],['goals',[1]],['total_tackle',[13]],['total_offside',[1]],['att_sv_low_left',[1]],['att_goal_low_right',[1]],['shot_off_target',[2]],['aerial_lost',[9]],['fk_foul_lost',[11]],['won_corners',[2]],['possession_percentage',[36.6]]]],[[128105,'Jesse Joronen',6.79,[[['accurate_pass',[16]],['touches',[39]],['saves',[4]],['total_pass',[26]],['good_high_claim',[1]],['formation_place',[1]]]],1,'GK',1,0,0,'GK',26,197,88]
,[296494,'Ales Mateju',6.24,[[['accurate_pass',[33]],['touches',[63]],['won_contest',[1]],['total_pass',[44]],['total_tackle',[1]],['formation_place',[3]]]],2,'DL',3,0,0,'D(L)',23,185,79]
,[96526,'Jhon Chancellor',6.92,[[['accurate_pass',[33]],['touches',[57]],['yellow_card',[1]],['total_scoring_att',[1]],['aerial_won',[3]],['total_pass',[35]],['total_tackle',[1]],['fouls',[1]],['formation_place',[6]]]],2,'DC',14,0,0,'D(C)',28,198,86]
,[283348,'Stefano Sabelli',7.03,[[['accurate_pass',[24]],['touches',[57]],['aerial_won',[1]],['goal_assist',[1]],['total_pass',[34]],['total_tackle',[4]],['formation_place',[2]]]],2,'DR',2,0,0,'D(R),M(R)',26,178,74]
,[255504,'Andrea Cistana',4.92,[[['accurate_pass',[19]],['penalty_conceded',[1]],['touches',[25]],['yellow_card',[1]],['total_pass',[21]],['red_card',[1]],['aerial_lost',[2]],['fouls',[2]],['formation_place',[5]]]],2,'DC',15,0,0,'D(C)',22,187,78]
,[96183,'Dimitri Bisoli',6.61,[[['accurate_pass',[10]],['touches',[38]],['yellow_card',[1]],['total_scoring_att',[1]],['total_pass',[19]],['total_tackle',[3]],['aerial_lost',[1]],['formation_place',[7]]]],3,'MC',25,0,0,'M(C)',25,180,72]
,[339507,'Nikolas Spalek',6.05,[[['accurate_pass',[4]],['touches',[9]],['total_pass',[5]],['formation_place',[8]]]],3,'AMC',7,1,45,'AM(C)',22,170,63]
,[343501,'Sandro Tonali',6.42,[[['accurate_pass',[20]],['touches',[40]],['yellow_card',[1]],['won_contest',[2]],['aerial_won',[1]],['total_pass',[26]],['aerial_lost',[1]],['fouls',[3]],['formation_place',[4]]]],3,'MC',4,1,81,'M(C)',19,181,79]
,[77350,'Rômulo',6.93,[[['accurate_pass',[28]],['touches',[51]],['total_scoring_att',[1]],['total_pass',[36]],['total_tackle',[4]],['formation_place',[11]]]],3,'MC',28,0,0,'D(R),M(CR)',32,178,72]
,[33799,'Mario Balotelli',7.29,[[['blocked_scoring_att',[1]],['accurate_pass',[14]],['touches',[47]],['yellow_card',[1]],['total_scoring_att',[3]],['total_pass',[26]],['goals',[1]],['aerial_lost',[1]],['fouls',[2]],['formation_place',[10]]]],4,'FW',45,0,0,'FW',29,189,88]
,[95795,'Ernesto Torregrossa',6.03,[[['accurate_pass',[7]],['touches',[20]],['aerial_won',[1]],['total_pass',[9]],['aerial_lost',[1]],['fouls',[2]],['formation_place',[9]]]],4,'FW',11,1,42,'FW',27,184,80]
,[300754,'Massimiliano Mangraviti',6.26,[[['accurate_pass',[21]],['touches',[28]],['won_contest',[1]],['total_pass',[24]],['aerial_lost',[2]],['fouls',[1]],['formation_place',[0]]]],5,'Sub',19,2,42,'Midfielder',21,183,72]
,[283273,'Jaromir Zmrhal',0,[[['formation_place',[0]]]],5,'Sub',8,0,0,'M(L)',26,189,79]
,[25079,'Alessandro Matri',0,[[['formation_place',[0]]]],5,'Sub',21,0,0,'FW',35,183,80]
,[362552,'Giangiacomo Magnani',0,[[['formation_place',[0]]]],5,'Sub',20,0,0,'D(C)',24,190,85]
,[296431,'Florian Aye',0,[[['formation_place',[0]]]],5,'Sub',18,0,0,'FW',22,184,70]
,[295473,'Alessandro Semprini',5.97,[[['accurate_pass',[3]],['touches',[4]],['aerial_won',[1]],['total_pass',[3]],['aerial_lost',[1]],['formation_place',[0]]]],5,'Sub',29,2,81,'Defender',21,183,75]
,[18989,'Enrico Alfonso',0,[[['formation_place',[0]]]],5,'Sub',22,0,0,'Goalkeeper',31,191,85]
,[12348,'Daniele Gastaldello',0,[[['formation_place',[0]]]],5,'Sub',5,0,0,'D(C)',36,187,77]
,[389132,'Mattia Viviani',6.33,[[['accurate_pass',[18]],['touches',[26]],['total_pass',[19]],['formation_place',[0]]]],5,'Sub',24,2,45,'Midfielder',19,183,74]
,[146568,'Leonardo Morosini',0,[[['formation_place',[0]]]],5,'Sub',23,0,0,'Midfielder',24,175,74]
,[255150,'Lorenzo Andrenacci',0,[[['formation_place',[0]]]],5,'Sub',12,0,0,'Goalkeeper',25,188,77]
],['4312',[[5,1]
,[8,3]
,[2,3]
,[5,5]
,[6,3]
,[4,3]
,[7,5]
,[5,7]
,[6,9]
,[4,9]
,[3,5]
]]
]
,[77,'Lazio',6.73142857142857,[[['blocked_scoring_att',[5]],['att_goal_low_left',[1]],['accurate_pass',[485]],['att_miss_left',[2]],['won_contest',[9]],['att_sv_high_centre',[1]],['ontarget_scoring_att',[6]],['total_scoring_att',[19]],['att_pen_goal',[1]],['total_throws',[14]],['aerial_won',[9]],['total_pass',[553]],['att_miss_high_left',[4]],['goals',[2]],['att_miss_right',[1]],['total_tackle',[14]],['total_offside',[2]],['att_sv_low_left',[1]],['att_goal_low_right',[1]],['shot_off_target',[8]],['aerial_lost',[7]],['att_sv_low_right',[2]],['fk_foul_lost',[23]],['won_corners',[5]],['possession_percentage',[63.4]],['att_miss_high',[1]]]],[[121480,'Thomas Strakosha',6.41,[[['accurate_pass',[17]],['touches',[25]],['saves',[2]],['total_pass',[18]],['formation_place',[1]]]],1,'GK',1,0,0,'GK',24,186,78]
,[21234,'Stefan Radu',6.14,[[['accurate_pass',[37]],['touches',[47]],['yellow_card',[1]],['won_contest',[1]],['total_pass',[40]],['aerial_lost',[1]],['fouls',[2]],['formation_place',[4]]]],2,'DC',26,1,59,'D(CL)',33,183,79]
,[54968,'Francesco Acerbi',6.97,[[['accurate_pass',[80]],['touches',[100]],['aerial_won',[1]],['total_pass',[88]],['total_tackle',[3]],['aerial_lost',[1]],['fouls',[2]],['formation_place',[5]]]],2,'DC',33,0,0,'D(C)',31,192,88]
,[294744,'Luiz Felipe',6.51,[[['accurate_pass',[65]],['touches',[78]],['total_scoring_att',[1]],['total_pass',[70]],['total_tackle',[2]],['aerial_lost',[1]],['fouls',[1]],['formation_place',[6]]]],2,'DC',3,0,0,'D(C)',22,187,80]
,[125378,'Joaquín Correa',7.09,[[['blocked_scoring_att',[1]],['accurate_pass',[63]],['touches',[91]],['won_contest',[3]],['total_scoring_att',[2]],['total_pass',[73]],['total_tackle',[1]],['aerial_lost',[1]],['fouls',[1]],['formation_place',[8]]]],3,'MC',11,0,0,'AM(CL),FW',25,189,75]
,[288767,'Sergej Milinkovic-Savic',6.58,[[['blocked_scoring_att',[1]],['accurate_pass',[44]],['touches',[73]],['total_scoring_att',[3]],['aerial_won',[5]],['total_pass',[58]],['aerial_lost',[1]],['fouls',[3]],['formation_place',[7]]]],3,'MC',21,0,0,'AM(C)',24,191,76]
,[287086,'Manuel Lazzari',6.4,[[['blocked_scoring_att',[1]],['accurate_pass',[28]],['touches',[50]],['won_contest',[1]],['total_scoring_att',[1]],['total_pass',[30]],['fouls',[2]],['formation_place',[2]]]],3,'DMR',29,0,0,'M(R)',26,174,67]
,[26587,'Marco Parolo',6.63,[[['blocked_scoring_att',[1]],['accurate_pass',[30]],['touches',[44]],['yellow_card',[1]],['won_contest',[1]],['total_scoring_att',[1]],['total_pass',[33]],['total_tackle',[3]],['fouls',[4]],['formation_place',[11]]]],3,'MC',16,1,59,'M(C)',34,184,75]
,[26168,'Senad Lulic',6.33,[[['accurate_pass',[24]],['touches',[49]],['won_contest',[1]],['total_scoring_att',[2]],['total_pass',[30]],['formation_place',[3]]]],3,'DML',19,1,77,'D(L),M(CL)',33,183,75]
,[22466,'Felipe Caicedo',7.61,[[['accurate_pass',[17]],['touches',[32]],['total_scoring_att',[3]],['goal_assist',[1]],['total_pass',[24]],['total_tackle',[2]],['aerial_lost',[1]],['fouls',[2]],['formation_place',[10]]]],4,'FW',20,0,0,'FW',31,183,84]
,[70141,'Ciro Immobile',8.58,[[['blocked_scoring_att',[1]],['accurate_pass',[29]],['touches',[45]],['won_contest',[1]],['total_scoring_att',[5]],['att_pen_goal',[1]],['aerial_won',[2]],['total_pass',[33]],['goals',[2]],['aerial_lost',[1]],['formation_place',[9]],['man_of_the_match',[1]]]],4,'FW',17,0,0,'FW',29,185,78]
,[118147,'Danilo Cataldi',6.38,[[['accurate_pass',[39]],['touches',[47]],['yellow_card',[1]],['total_pass',[42]],['total_tackle',[2]],['fouls',[2]],['formation_place',[0]]]],5,'Sub',32,2,59,'M(C)',25,180,70]
,[140261,'Patric',0,[[['formation_place',[0]]]],5,'Sub',4,0,0,'D(CR),M(R)',26,184,72]
,[369427,'Jorge Silva',0,[[['formation_place',[0]]]],5,'Sub',49,0,0,'Defender',20,184,]
,[382238,'Bobby Adekanye',0,[[['formation_place',[0]]]],5,'Sub',34,0,0,'Forward',20,170,]
,[275698,'Adam Marusic',0,[[['formation_place',[0]]]],5,'Sub',77,0,0,'M(R)',27,185,76]
,[132688,'Bastos',0,[[['formation_place',[0]]]],5,'Sub',15,0,0,'D(C)',28,184,77]
,[18286,'Silvio Proto',0,[[['formation_place',[0]]]],5,'Sub',24,0,0,'GK',36,187,77]
,[382237,'André Anderson',6.18,[[['touches',[4]],['total_scoring_att',[1]],['fouls',[3]],['formation_place',[0]]]],5,'Sub',28,2,77,'Midfielder',20,180,]
,[294140,'Jony',6.43,[[['accurate_pass',[12]],['touches',[35]],['yellow_card',[1]],['won_contest',[1]],['aerial_won',[1]],['total_pass',[14]],['total_tackle',[1]],['fouls',[1]],['formation_place',[0]]]],5,'Sub',22,2,59,'M(LR)',28,179,76]
,[72982,'Valon Berisha',0,[[['formation_place',[0]]]],5,'Sub',7,0,0,'AM(C)',26,176,70]
,[121532,'Guido Guerrieri',0,[[['formation_place',[0]]]],5,'Sub',23,0,0,'Goalkeeper',23,184,78]
],['352',[[5,1]
,[1,6]
,[9,6]
,[7,3]
,[5,3]
,[3,3]
,[3,6]
,[7,6]
,[6,9]
,[4,9]
,[5,6]
]]
]
]
], 300];
var kaka = 123;
var lala = [1, 2, 3];
</script>
`;

var stuff = `<script>
var matchStats = 
[1,2,3]; 
</script>`;

stuff = stuff.replace(/(\r\n|\n|\r)/gm, "");
sampleData = sampleData.replace(/(\r\n|\n|\r)/gm, "");

const regex = /var matchStats(.*?)];/g;

result = sampleData.match(regex);
// result = stuff.match(regex);

// console.log(result);

eval(result[0]);

console.log(matchStats[0][2][1][3]);