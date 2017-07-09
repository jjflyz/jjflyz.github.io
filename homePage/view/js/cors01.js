/**
 * Created by tianjian on 17/6/19.
 */
function handleResponse(response){
    alert("you are at IP address "+response.ip+", which is in "+response.city+", "+response.region_name);
}
!(function main(){
    var script=document.createElement('script');
    script.src="http://freegeoip.net/json/?callback=handleResponse";
    document.body.insertBefore(script,document.body.firstChild);
})();