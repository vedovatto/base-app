'use strict';

app.decorator('MomentJS', function($delegate) {

  // PRIVATE PROPERTIES
  var SUNDAY_IDENTIFIER = 0;
  var SATURDAY_IDENTIFIER = 6;
  // -->

  // PRIVATE OPERATIONS
  var init = function() {
    $delegate.defineLocale('pt-BR', {
      months: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
      monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
      weekdays: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
      weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      weekdaysMin: [ 'dom', '2ª', '3ª', '4ª', '5ª', '6ª', 'sáb' ],
      longDateFormat: {
        LT: 'HH:mm',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [às] LT',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT'
      },
      calendar: {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function() {
          return (this.day() === SUNDAY_IDENTIFIER || this.day() === SATURDAY_IDENTIFIER) ?
            '[Último] dddd [às] LT' : // Saturday + Sunday
            '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
      },
      relativeTime: {
        future: 'em %s',
        past: '%s atrás',
        s: 'segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mês',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
      },
      ordinal: '%dº'
    });
  };
  // -->

  // CONSTRUCTOR
  init();
  // -->

  return $delegate;

});