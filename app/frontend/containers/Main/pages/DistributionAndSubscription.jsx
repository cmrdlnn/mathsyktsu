import React, { Fragment } from 'react';

function DistributionAndSubscription() {
  return (
    <Fragment>
      <img className="title" src="/images/title.png" alt="О журнале" />
      <p className="caption">
        Распространение и подписка
      </p>
      <div className="main-description">
        <p className="main-description-title">ГРАФИК ВЫХОДА ИЗДАНИЯ</p>
        один раз в год
        <p className="mt-3 main-description-title">РАСПРОСТРАНЕНИЕ</p>
        Приобрести журнал можно в книжной лавке СыктГУ по адресу: Сыктывкар, Октябрьский пр., д.55, главный корпус, 1 этаж (рядом со входом).
      </div>
    </Fragment>
  );
}

export default DistributionAndSubscription;
