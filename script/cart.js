$(document).ready(function () {

	// Path: Assignment\12-PS33100-PhamVanHieu-Assignment-Project-JS\script\cart.js

	$(".largeGrid").click(function () {
		$(this).find('a').addClass('active');
		$('.smallGrid a').removeClass('active');

		$('.product').addClass('large').each(function () {
		});
		setTimeout(function () {
			$('.info-large').show();
		}, 200);
		setTimeout(function () {

			$('.view_gallery').trigger("click");
		}, 400);

		return false;
	});

	$(".smallGrid").click(function () {
		$(this).find('a').addClass('active');
		$('.largeGrid a').removeClass('active');

		$('div.product').removeClass('large');
		$(".make3D").removeClass('animate');
		$('.info-large').fadeOut("fast");
		setTimeout(function () {
			$('div.flip-back').trigger("click");
		}, 400);
		return false;
	});

	$(".smallGrid").click(function () {
		$('.product').removeClass('large');
		return false;
	});

	$('.colors-large a').click(function () { return false; });


	$('.product').each(function (i, el) {

		// Lift card and show stats on Mouseover
		$(el).find('.make3D').hover(function () {
			$(this).parent().css('z-index', "20");
			$(this).addClass('animate');
			$(this).find('div.carouselNext, div.carouselPrev').addClass('visible');
		}, function () {
			$(this).removeClass('animate');
			$(this).parent().css('z-index', "1");
			$(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
		});

		// Flip card to the back side
		$(el).find('.view_gallery').click(function () {

			$(el).find('div.carouselNext, div.carouselPrev').removeClass('visible');
			$(el).find('.make3D').addClass('flip-10');
			/**
			* chức năng để làm cho 3D và xoay 90 độ ánh sáng trên đầu trang sản phẩm khi người dùng nhấp vào
			*/
			setTimeout(function () {
				$(el).find('.make3D').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo(80, 1, function () {
					$(el).find('.product-front, .product-front div.shadow').hide();
				});
			}, 50);

			/**
			* chức năng để hiển thị sản phẩm và quay lại và hiển thị bóng khi nhấp vào nút sản phẩm (s) trong 3
			*/
			setTimeout(function () {
				$(el).find('.make3D').removeClass('flip90').addClass('flip190');
				$(el).find('.product-back').show().find('div.shadow').show().fadeTo(90, 0);
				/**
				* chức năng để ẩn carousel 3D trên mouseover / zoom thay đổi tên lớp và chuyển sang 100ms trong
				*/
				setTimeout(function () {
					$(el).find('.make3D').removeClass('flip190').addClass('flip180').find('div.shadow').hide();
					/**
					* chức năng để hiển thị 3D cavema và thêm lớp vào next / prev cavema
					*/
					setTimeout(function () {
						$(el).find('.make3D').css('transition', '100ms ease-out');
						$(el).find('.cx, .cy').addClass('s1');
						setTimeout(function () { $(el).find('.cx, .cy').addClass('s2'); }, 100);
						setTimeout(function () { $(el).find('.cx, .cy').addClass('s3'); }, 200);
						$(el).find('div.carouselNext, div.carouselPrev').addClass('visible');
					}, 100);
				}, 100);
			}, 150);
		});

		// Flip card back to the front side
		/**
		* Chuyển lại và chuyển đổi các shader phía trước khi tải trang để làm cho chúng dễ đọc hơn.
		*/
		$(el).find('.flip-back').click(function () {

			$(el).find('.make3D').removeClass('flip180').addClass('flip190');
			/**
			* chức năng để làm cho 3D và vọt 90% của sản phẩm ánh sáng / tối / xám (vọt 190 vọt 90
			*/
			setTimeout(function () {
				$(el).find('.make3D').removeClass('flip190').addClass('flip90');

				$(el).find('.product-back div.shadow').css('opacity', 0).fadeTo(100, 1, function () {
					$(el).find('.product-back, .product-back div.shadow').hide();
					$(el).find('.product-front, .product-front div.shadow').show();
				});
			}, 50);

			setTimeout(function () {
				$(el).find('.make3D').removeClass('flip90').addClass('flip-10');
				$(el).find('.product-front div.shadow').show().fadeTo(100, 0);
				setTimeout(function () {
					$(el).find('.product-front div.shadow').hide();
					$(el).find('.make3D').removeClass('flip-10').css('transition', '100ms ease-out');
					$(el).find('.cx, .cy').removeClass('s1 s2 s3');
				}, 100);
			}, 150);

		});

		makeCarousel(el);
	});

	$('.add-cart-large').each(function (i, el) {
		$(el).click(function () {
			var carousel = $(this).parent().parent().find(".carousel-container");
			var img = carousel.find('img').eq(carousel.attr("rel"))[0];
			var position = $(img).offset();

			var productName = $(this).parent().find('h4').get(0).innerHTML;

			$("body").append('<div class="floating-cart"></div>');
			var cart = $('div.floating-cart');
			$("<img src='" + img.src + "' class='floating-image-large' />").appendTo(cart);

			$(cart).css({ 'top': position.top + 'px', "left": position.left + 'px' }).fadeIn("slow").addClass('moveToCart');
			setTimeout(function () { $("body").addClass("MakeFloatingCart"); }, 800);

			/**
			* Chức năng này được gọi khi người dùng nhấp vào nút xóa. Nó loại bỏ div xe nổi và tái tạo xe
			*/
			setTimeout(function () {
				$('div.floating-cart').remove();
				$("body").removeClass("MakeFloatingCart");


				var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='" + img.src + "' alt='' /></div><span>" + productName + "</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";

				$("#cart .empty").hide();
				$("#cart").append(cartItem);
				$("#checkout").fadeIn(500);

				$("#cart .cart-item").last()
					.addClass("flash")
					/**
					* Tắt mục khỏi giỏ và kiểm tra xem không còn các mục để làm như vậy (không cần nhấp vào hoặc " Thêm
					*/
					.find(".delete-item").click(function () {
						$(this).parent().fadeOut(300, function () {
							$(this).remove();
							if ($("#cart .cart-item").size() == 0) {
								$("#cart .empty").fadeIn(500);
								$("#checkout").fadeOut(500);
							}
						})
					});
				setTimeout(function () {
					$("#cart .cart-item").last().removeClass("flash");
				}, 10);

			}, 1000);


		});
	})

	/* ----  Image Gallery Carousel   ---- */
	/**
	* Làm cho carousel carousel trượt carousel và tải hình ảnh tiếp theo.
	* 
	* @param el - chọn jquery của carousel để làm
	* 
	* @return { boolean } đúng nếu carousel sẵn sàng để được chơi giả nếu nó không sẵn sàng để
	*/
	function makeCarousel(el) {


		var carousel = $(el).find('.carousel ul');
		var carouselSlideWidth = 315;
		var carouselWidth = 0;
		var isAnimating = false;
		var currSlide = 0;
		$(carousel).attr('rel', currSlide);

		// building the width of the casousel
		/**
		* / / object / list để sử dụng trong một cuộc gọi cho bất kỳ phương pháp nào của đối tượng
		*/
		$(carousel).find('li').each(function () {
			carouselWidth += carouselSlideWidth;
		});
		$(carousel).css('width', carouselWidth);

		// Load Next Image
		/**
		* chức năng để hoạt động carousel đến slide tiếp theo. nó được gọi mỗi 5 giây để chúng ta không phải lo lắng về hoạt
		* 
		* 
		* @return { không xác định } -
		*/
		$(el).find('div.carouselNext').on('click', function () {
			var currentLeft = Math.abs(parseInt($(carousel).css("left")));
			var newLeft = currentLeft + carouselSlideWidth;
			// Nếu bên trái mới là chiều rộng của chiều rộng carousel hoặc hoạt hình được bật.
			if (newLeft == carouselWidth || isAnimating === true) { return; }
			$(carousel).css({
				'left': "-" + newLeft + "px",
				"transition": "300ms ease-out"
			});
			isAnimating = true;
			currSlide++;
			$(carousel).attr('rel', currSlide);
			setTimeout(function () { isAnimating = false; }, 300);
		});

		// Load Previous Image
		/**
		* Thay đổi vị trí của carousel bằng chiều rộng slideze. Điều này được gọi mỗi khi người dùng trượt một trang hoặc s
		* 
		* 
		* @return { undefined } không có hoạt hình đang chạy hoặc vị trí là ngoài giới hạn ( - 1 là trang chiếu cuối cùng
		*/
		$(el).find('div.carouselPrev').on('click', function () {
			var currentLeft = Math.abs(parseInt($(carousel).css("left")));
			var newLeft = currentLeft - carouselSlideWidth;
			// Nếu newLeft là âm động sẽ bị dừng lại.
			if (newLeft < 0 || isAnimating === true) { return; }
			$(carousel).css({
				'left': "-" + newLeft + "px",
				"transition": "300ms ease-out"
			});
			isAnimating = true;
			currSlide--;
			$(carousel).attr('rel', currSlide);
			setTimeout(function () { isAnimating = false; }, 300);
		});
	}

	/**
	* Chức năng để thêm các nhãn x và y vào một yếu tố khi nhấp vào một trong các yếu tố. Đây là một hàm
	* 
	* @param i - Chỉ số của yếu tố
	* @param el - Bộ chọn jQuery mà bạn đã nhấp vào. Đây là yếu tố chúng tôi đang tạo
	* 
	* @return { undefined } hàm không trả lại gì để ngăn chặn vòng lặp trong hàm. Nếu bạn muốn dừng hoạt hình đặt điều này để
	*/
	$('.sizes a span, .categories a span').each(function (i, el) {
		$(el).append('<span class="x"></span><span class="y"></span>');

		/**
		* Động hình một hộp kiểm và kiểm tra vị trí của nó. Điều này được sử dụng để ngăn chặn nhấp vào các hộp kiểm
		* 
		* 
		* @return Đúng là sai
		*/
		$(el).parent().on('click', function () {
			// Kiểm tra xem phần tử đã kiểm tra lớp
			if ($(this).hasClass('checked')) {
				$(el).find('.y').removeClass('animate');
				setTimeout(function () {
					$(el).find('.x').removeClass('animate');
				}, 50);
				$(this).removeClass('checked');
				return false;
			}

			$(el).find('.x').addClass('animate');
			setTimeout(function () {
				$(el).find('.y').addClass('animate');
			}, 100);
			$(this).addClass('checked');
			return false;
		});
	});

	/**
	* chức năng để di chuyển sản phẩm vào giỏ và thêm nó vào giỏ nổi sau 800ms (1 / 8 giây
	*/
	$('.add_to_cart').click(function () {
		var productCard = $(this).parent();
		var position = productCard.offset();
		var productImage = $(productCard).find('img').get(0).src;
		var productName = $(productCard).find('.product_name').get(0).innerHTML;

		$("body").append('<div cla' + 'ss="floating-cart"></div>');
		var cart = $('div.floating-cart');
		productCard.clone().appendTo(cart);
		$(cart).css({ 'top': position.top + 'px', "left": position.left + 'px' }).fadeIn("slow").addClass('moveToCart');
		setTimeout(function () { $("body").addClass("MakeFloatingCart"); }, 100);
		/**
		* chức năng để thêm mục xe vào xe mua sắm và flash xe khi mục được xóa khỏi mua sắm
		*/
		setTimeout(function () {
			$('div.floating-cart').remove();
			$("body").removeClass("MakeFloatingCart");


			var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='" + productImage + "' alt='' /></div><span>" + productName + "</span><strong class='price'>39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";

			$("#cart .empty").hide();
			$("#cart").append(cartItem);
			$("#checkout").fadeIn(100);

			$("#cart .cart-item").last()
				.addClass("flash")
				/**
				* Tắt mục khỏi giỏ và kiểm tra xem không còn các mục để làm như vậy (không cần nhấp vào hoặc " Thêm
				*/
				.find(".delete-item").click(function () {
					$(this).parent().fadeOut(100, function () {
						$(this).remove();
						// nếu các mặt hàng trong giỏ xe trống
						if ($("#cart .cart-item").size() == 0) {
							$("#cart .empty").fadeIn(100);
							$("#checkout").fadeOut(100);
						}
					})
				});
			/**
			* / / object / list object được sử dụng để xác định loại đối tượng đang được
			*/
			setTimeout(function () {
				$("#cart .cart-item").last().removeClass("flash");
			}, 10);

		}, 1000);
	});

});
// Chức năng tính tổng tiền của giỏ hàng
function calculateTotal() {
	var total = 0;
	$("#cart .cart-item").each(function () {
		
		var price = parseFloat($(this).find(".price").text());
		total += price;
		console.log(total);
		console.log(price);
		document.getElementById("totalsprice").innerHTML = total + " $";
	})
	alert("Tổng tiền hóa đơn của bạn là: " + total + " $" +"Vui long thanh toán tại quầy khi nhận hàng");
}

