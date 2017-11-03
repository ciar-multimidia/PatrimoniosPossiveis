jQuery(document).ready(function($) {
	var figures = $('#conteudo figure');
	figures.on('click', function(event) {
		$(this).toggleClass('ampliado');
	});
});