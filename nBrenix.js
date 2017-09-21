var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, 
    function (items) {

        active = items.activate;

        if(active) {
            main();
        }

    });

} 
catch (e) {

    if(active) {
        main();
    }

}

function main() {
    (function ($) {
        var self = {
            rNetImgs: [
                'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/18519642_1093024990841387_8332388541154921857_n.jpg?oh=2bec634f7cfa2282862cb54a6bbfbad2&oe=5A5284BB',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/16730458_1452531248091363_7894035932012401383_n.jpg?oh=679a58c4d9e1176dc06f32ac97cf70ba&oe=5A5C257A',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/13775400_878260268984528_7961652821014323588_n.jpg?oh=9d208b7a8d8f52eedc4b25826e6a28f8&oe=5A3D0D41',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/11156270_987331517944674_5951577761814531819_n.jpg?oh=e8de5072cca902bd09ca0618af889300&oe=5A4202A1',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/10420202_823098851034609_4006675526702189230_n.jpg?oh=30fef27b8bc4748afaf7b14d659b5cf7&oe=5A4755C5',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/62397_501637016543343_1940427076_n.jpg?oh=d72d9eb683df1c5f31c8391b02733461&oe=5A3D1637',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/381451_2676958417033_428376393_n.jpg?oh=a15d0d1268aff5659e7e538806179f0a&oe=5A517757',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/200716_113050065441284_4401991_n.jpg?oh=c751a18911007b0452c9d1e9cda2f08f&oe=5A40774A',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/16142635_1420775514600270_2177779085107734218_n.jpg?oh=161134f7e0025cb4a4b6c42d904b7f42&oe=5A4B9FB9',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/12369230_761988583945031_2430841527406207387_n.jpg?oh=3ee513097854c4f271fa8dccfb5171c7&oe=5A4BCEA8',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/12278985_982854228437485_8917346510141622344_n.jpg?oh=b47d824ddd57f73a491529883414c97a&oe=5A3EC981',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/409434_340683975960662_1897645583_n.jpg?oh=992bf90d60b51ce116e22a857006920f&oe=5A5CB390',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/378001_312048935490833_229169031_n.jpg?oh=0adb048f44f25e06d168d1344e5e4c8a&oe=5A4B6D1F',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-0/p206x206/303033_313840871960412_1956272554_n.jpg?oh=39693872c8c23e12ad1d0fb1327022ba&oe=5A3A36E6',
				'https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/18893330_1571907509487069_2722220576716116201_n.jpg?oh=931c5fd4a791e98d65e80a97a1e19e96&oe=5A596D35'
			],

            //Handles all images on page with an interval of time
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
                    //Skip if image is already replaced
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        if (h > 0 && w > 0) {
                            self.handleImg(item, lstImgs);
                        }
                        else {
                            $(item).load(function () {
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                });

                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },

            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },

            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            },

            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        $(function () {
            self.handleImages(self.rNetImgs, 2000);
        });

        $.rNet = self;

    })(jQuery);
}