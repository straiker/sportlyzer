$(document).ready(function(){
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var users = new Array();
    $.getJSON('http://api.randomuser.me/?randomapi&results=20&orderby=asc',function(data){
        /* sidebar user data*/
        $("#sidebar-header img").attr('src',data.results[0].user.picture);
        $("#sidebar-header p").html(data.results[0].user.name.first+" "+data.results[0].user.name.last);

        /* users list */
        $.each(alphabet, function(i){
            $("#alphabet ul").append("<li><a href='#"+alphabet[i]+"'>"+alphabet[i]+"</a>");
            for(var j = 0; j < data.results.length; j++){
                var user = data.results[j].user;
                users.push(new Array());
                if(user.name.last.substring(0,1) == alphabet[i]){
                    users[i].push(j);
                }
            }
        });

        $.each(users, function(i){
            if(users[i] != ""){
                console.log(alphabet[i]+" : "+users[i]+" - "+users[i].length);
                $("#contacts ul").append("<a name='"+alphabet[i]+"'></a><h2>"+alphabet[i]+"</h2>");
                $.each(users[i], function(j){
                    var z = users[i][j];
                    $("#contacts ul").append(
                        $("<li></li>").append(
                            "<img src='"+data.results[z].user.picture+"'><p>"+data.results[z].user.name.last+", "+data.results[z].user.name.first+"</p>"
                        ));
                });
            }
        });
    });
});
