let baseUrl = "http://localhost/h5-203/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery'], function($) {
    return {
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        // console.log(elm.pic);
                        let pic = JSON.parse(elm.pic);
                        console.log(pic);
                        temp += `<li class="box ">
                        <a target="_blank " href="${baseUrl}/src/html/details.html?id=${elm.id}">
                            <img src="${baseUrl}/src/${pic[0].src}" style="display: inline; ">
                        </a>
                        <div class="color-wrapper ">
                            <p class="name ">
                            ${elm.name}
                            </p>
                        </div>
                        <div class="prodinfo ">
                            <p class="name ">
                            ${elm.name}
                            </p>
                            <p class="feature "> ${elm.title}</p>
                            <p class="price rmb-symbol ">${elm.price}</p>
                        </div>
                    </li>`;
                    });

                    $('.c_3>.box-list').html(temp);

                }
            });
        }
    }
});