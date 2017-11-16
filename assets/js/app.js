jQuery(document).ready(function($) {

	// variação de cor do título
	var sessionCor = 'patripossi_coratual';
	var coratual = sessionStorage.getItem(sessionCor);
	if (coratual) {
		console.log(coratual);
		$('#topo h1').addClass('var'+coratual);
		switch(coratual){
			case '1': sessionStorage.setItem(sessionCor, '2'); break;
			case '2': sessionStorage.setItem(sessionCor, '3'); break;
			case '3': sessionStorage.setItem(sessionCor, '1'); break;
		}
	} else{
		$('#topo h1').addClass('var1');
		sessionStorage.setItem(sessionCor, '2');
	}




	// função que retorna um objeto com todas as variações do transform
	var crossBrowserTransform = function(valor){
		return {
			'-webkit-transform': valor,
			    '-ms-transform': valor,
			        'transform': valor
		};
	}




	// Ampliação das fotos
	var figures = $('#conteudo section.imagem-unica figure img');
	figures.on('click', function(event) {
		$(this).parent().toggleClass('ampliado');
	});





	// Galerias de foto
	var galerias = $('section.galeria');

	if (galerias.length > 0) {
		galerias.each(function(index, el) {
			var essagaleria = $(el);
			essagaleria.append(
				'<div class="imagens-container"></div>\
				<div class="captions-container"></div>\
				<div class="thumbnails-container"></div>'
			);

			var imagens = essagaleria.find('.imagens-container');
			var thumbs = essagaleria.find('.thumbnails-container');
			var captions = essagaleria.find('.captions-container');

			essagaleria.find('figure img').appendTo(imagens);
			imagens.find('img').each(function(index, el) {
				var botao = $('<button></button>').append($(el).clone());
				essagaleria.find('.thumbnails-container').append(botao);
			});
			essagaleria.find('figure figcaption').each(function(index, el) {
				captions.append($('<p></p>').html( $(el).html() ));
			});
			essagaleria.find('.figures-container').remove();



			var slideAtual = 0;

			var mudarSlide = function(){
				essagaleria.children('div').each(function(index, el) {
					var essadiv = $(el);
					var elementoatual = essadiv.children().eq(slideAtual);
					essadiv.children().removeClass('ativo').eq(slideAtual).addClass('ativo');
					
					if (!essadiv.hasClass('thumbnails-container')) {
						var valueTransform = essadiv.width()/2 - ((elementoatual.position().left)) - elementoatual.width()/2;
						essadiv.css(crossBrowserTransform('translateX('+valueTransform+'px)') );
					}
				});
				// imagens.find('img').removeClass('ativo').eq(slideAtual).addClass('ativo');
				// thumbs.find('button').removeClass('ativo').eq(slideAtual).addClass('ativo');
				// captions.find('p').removeClass('ativo').eq(slideAtual).addClass('ativo');
			}

			mudarSlide();

			imagens.find('img').on('click', function(event) {
				slideAtual = imagens.find('img').index($(this));
				console.log('novo slide: ', slideAtual);
				mudarSlide();
			});

			thumbs.find('button').on('click', function(event) {
				slideAtual = thumbs.find('button').index($(this));
				console.log('novo slide: ', slideAtual);
				mudarSlide();

			});
		});
	}




	// notas de rodapé
	var html = $('html')
	var corpo = $('body');
	var btRodape = $('button.botao-rodape');
	var notasRodape = $('.nota-rodape');

	var transitionendPrefixed = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';


// <img src=\'assets/media/icone-fechar.svg\' aria-hidden=\'true\'>\
	notasRodape.each(function(index, el) {
		$(el).prepend('\
			<button class=\'fechar\' title=\'Fechar nota de rodapé\'>\
			</button>');

		$(el).find('.fechar').on('click', function(event) {
			$(el).addClass('easing-saida');
			notasRodape.removeClass('visivel');
			btRodape.removeClass('ativado');
			rodapeAtual = 0;
		});

		$(el).on(transitionendPrefixed, function(event) {
			if (!$(this).hasClass('visivel')) {
				$(this).removeClass('db easing-saida');
			}
		});
	});

	var rodapeAtual = 0;

	var rodapeAtual = 0;

	btRodape.on('click', function(event) {
		var thisNumero = parseInt($(this).attr('data-numero'));
		if (thisNumero !== rodapeAtual) {
			var thisTop = $(this).offset().top;
			var thisLeft = $(this).offset().left;
			var thisHeight = $(this).outerHeight();
			notasRodape.filter('[data-numero=\''+rodapeAtual+'\']').addClass('easing-saida');
			notasRodape.removeClass('visivel');
			var notaRevelar = notasRodape.filter('[data-numero=\'' + thisNumero + '\']');
			notaRevelar.addClass('db');
			notaRevelar.css({
				'top': '',
				'left': ''
			});

			var topNota = (function(){
				var topCalculado = thisTop - notaRevelar.outerHeight();
				if (topCalculado > 0) {
					notaRevelar.removeClass('origem-top');
					return thisTop - notaRevelar.outerHeight();
				} else{
					notaRevelar.addClass('origem-top');
					return thisTop + thisHeight;
				}
			})();

			var leftNota = (function(){
				var leftCalculado = thisLeft - notaRevelar.outerWidth()/2;
				if (leftCalculado < 0) {
					return 0;
				} else if(leftCalculado + notaRevelar.outerWidth() > corpo.width() ){
					return corpo.width() - notaRevelar.outerWidth();
				} else{
					return leftCalculado;
				}
			})();
			btRodape.removeClass('ativado');
			$(this).addClass('ativado');
			notaRevelar.css({
				'top': topNota,
				'left': leftNota
			}).addClass('visivel');


			if (topNota < html.scrollTop()) {
				html.animate({'scrollTop' : topNota}, 200);
			}

			rodapeAtual = thisNumero;
		}
		

	});





	// Sumário

	var htmlecorpo = $('html, body');
	var footer = $('footer');
	var btsumario = footer.find('.navegadores button');
	var fecharsumario = footer.find('button.fechar');
	var itenssumario = footer.find('.sumario .itens > a');
	btsumario.on('click', function(event) {
		event.preventDefault();
		htmlecorpo.addClass('blockscroll');
		footer.addClass('fullscreen');
		itenssumario.removeClass('visivel');
	});

	fecharsumario.on('click', function(event) {
		$(this).removeClass('visivel');
		event.preventDefault();
		htmlecorpo.removeClass('blockscroll');
		footer.removeClass('fullscreen');
	});

	footer.on(transitionendPrefixed, function(){
		if ($(this).hasClass('fullscreen')) {
			fecharsumario.addClass('visivel');
			var incremento = 30;
			var tempo = 0;
			itenssumario.each(function(index, el) {
				setTimeout(function(){
					$(el).addClass('visivel');
				}, tempo);
				tempo += incremento;

			});
		}
	});
});







