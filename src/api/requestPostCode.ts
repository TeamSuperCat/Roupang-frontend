let postcodePopup: any = null; // 추가한 변수: 팝업 추적을 위한 전역 변수

export default function daumPostCode(handleZipCode: any, updateAddress: any) {
  // 추가한 조건문: 팝업이 이미 열려 있으면 포커스를 주고 함수를 종료합니다.
  if (postcodePopup && !postcodePopup.closed) {
    postcodePopup.focus();
    return;
  }

  function oncomplete(data: any) {
    handleZipCode(data.zonecode);

    if (data.userSelectedType === "R") {
      updateAddress({ base: data.roadAddress });
    }
    if (data.userSelectedType === "J") {
      updateAddress({ base: data.jibunAddress });
    }
  }
  // 추가한 코드: 팝업이 닫혔음을 기록하는 이벤트 리스너
  const onclose = () => {
    postcodePopup = null;
  };

  postcodePopup = new window.daum.Postcode({
    oncomplete: oncomplete,
    onclose: onclose, // 추가한 코드: 이벤트 리스너를 등록합니다.
  });

  postcodePopup.open({
    popupName: "postcodePopup", // 팝업에 고유한 이름을 부여합니다.
  });
}
