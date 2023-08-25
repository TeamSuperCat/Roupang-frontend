import { styled } from "styled-components";
import useOrder from "../../hooks/useOrder";
import daumPostCode from "../../api/requestPostCode";

function ShipInfo() {
  const {
    zipCodeState: { zipCode, handleZipCode, insertZipcode },
    addressState: { address, updateAddress },
    phoneState: { phone, updatePhone },
    emailState: { email, updateEmail },
    formState: { form, handleTo },
  } = useOrder();

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "forward" || e.target.name === "backward") {
      if (!isNaN(Number(e.target.value)) || e.target.value === "") {
        updatePhone({ ...phone, [e.target.name]: e.target.value });
      }
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateEmail({ ...email, [e.target.name]: e.target.value });
    console.log(email);
  };

  return (
    <ShipInfoWrap>
      {/* <InputWrap>
        <InputGroup>
          <InputChecked type="radio" id="member" name="shipment" />
          <label htmlFor="member">회원 정보와 동일</label>
        </InputGroup>
        <InputGroup>
          <input type="radio" id="new" name="shipment" />
          <label htmlFor="new">새로운 배송지</label>
        </InputGroup>
      </InputWrap> */}
      <ReceiverWrap>
        <colgroup>
          <Col1 />
          <Col2 />
        </colgroup>
        <tbody>
          <tr>
            <th scope='row'>받는사람</th>
            <td>
              <input type='text' value={form.To} onChange={handleTo} />
            </td>
          </tr>
          <tr>
            <th scope='row'>주소</th>
            <td>
              <ul>
                <li>
                  <input
                    id='zipcode'
                    type='text'
                    readOnly
                    placeholder='우편번호'
                    value={zipCode}
                    onChange={handleZipCode}
                  />
                  <button onClick={() => daumPostCode(insertZipcode, updateAddress)}>주소검색</button>
                </li>
                <li>
                  <input
                    id='base_addr'
                    type='text'
                    name='base'
                    readOnly
                    placeholder='기본주소'
                    value={address.base}
                    onChange={handleAddress}
                  />
                </li>
                <li>
                  <input
                    type='text'
                    name='rest'
                    placeholder='나머지 주소(선택 입력 가능)'
                    value={address.rest}
                    onChange={handleAddress}
                  />
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope='row'>휴대전화</th>
            <td>
              <div className='phone'>
                <select id='prefix' name='prefix' onChange={handlePhone}>
                  <option value='010'>010</option>
                  <option value='011'>011</option>
                  <option value='016'>016</option>
                  <option value='017'>017</option>
                  <option value='018'>018</option>
                  <option value='019'>019</option>
                </select>
                -
                <input type='text' name='forward' maxLength={4} value={phone.forward} onChange={handlePhone} />
                -
                <input type='text' name='backward' maxLength={4} value={phone.backward} onChange={handlePhone} />
              </div>
            </td>
          </tr>
          <tr>
            <th scope='row'>이메일</th>
            <td className='email_wrap'>
              <input
                type='text'
                id='email'
                className='email'
                name='forward'
                value={email.forward}
                onChange={handleEmail}
              />
              @
              <span className='email_select'>
                <select
                  id='email'
                  className='email_select'
                  name='backward'
                  value={email.backward}
                  onChange={handleEmail}
                >
                  <option value='' defaultValue='-이메일 선택-'>
                    -이메일 선택-
                  </option>
                  <option value='naver.com'>naver.com</option>
                  <option value='daum.net'>daum.net</option>
                  <option value='nate.com'>nate.com</option>
                  <option value='hotmail.com'>hotmail.com</option>
                  <option value='yahoo.com'>yahoo.com</option>
                  <option value='empas.com'>empas.com</option>
                  <option value='korea.com'>korea.com</option>
                  <option value='dreamwiz.com'>dreamwiz.com</option>
                  <option value='gmail.com'>gmail.com</option>
                  {/* <option value="etc">직접입력</option> */}
                </select>
                <span>
                  <input id='email' name='email' placeholder='직접입력' type='text' />
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </ReceiverWrap>
    </ShipInfoWrap>
  );
}

export default ShipInfo;

const ShipInfoWrap = styled.div`
  display: grid;
  grid-template-rows: auto;
  margin-left: 12px;
`;

// const InputWrap = styled.div`
//   display: flex;
//   width: 100%;
// `;

// const InputGroup = styled.div`
//   display: flex;
//   align-items: center;
//   height: 50px;
//   margin-bottom: 15px;

//   & input {
//     vertical-align: middle;
//     appearance: none;
//     border: max(2px, 0.2em) solid gray;
//     border-radius: 50%;
//     width: 1.6em;
//     height: 1.6em;
//     margin-right: 6px;
//     cursor: pointer;

//     &:checked {
//       border: 0.4em solid var(--primary-color);
//     }
//   }

//   & label {
//     display: flex;
//     align-items: center;
//     width: 132px;
//     /* height: 29px; */
//     line-height: 50px;
//     vertical-align: middle;
//     transform: translateY(2px);
//     font-size: 16px;
//     letter-spacing: -1px;
//     cursor: pointer;
//   }
// `;

// const InputChecked = styled.input.attrs({ defaultChecked: true })``;

const ReceiverWrap = styled.table`
  box-sizing: border-box;
  font-size: 13px;
  font-family: "Jost";
  font-weight: 600;
  color: #383838;
  margin-left: 7px;
  margin-right: 18px;
  margin-bottom: 20px;

  & td {
    height: 57px;
  }

  & ul li {
    height: 57px;
  }

  & input {
    box-sizing: border-box;
    outline: none;
    border: 1px solid #eaeaea;
    height: 42px;
    /* margin-top: 15px; */
    width: 100%;
  }

  & li:nth-child(1) {
    & input {
      width: 200px;
      border-right: none;
    }

    & button {
      background: none;
      outline: none;
      border: 1px solid #a7a7a7;
      height: 42px;
      /* margin-top: 15px; */
      transform: translateY(1.4px);
    }
  }

  & select {
    /* margin-top: 15px; */
    height: 42px;
    outline: none;
  }

  & .phone {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    align-items: center;
    height: 57px;

    & input {
      margin-right: 2px;
    }
  }

  & .email_wrap {
    display: flex;
    align-items: center;
    position: relative;
  }

  & input.email {
    width: 48%;
  }

  & .email_select {
    display: flex;
    flex: 1;
    position: relative;

    & > select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: translateY(-21px);
      outline: none;
      border: 1px solid #a7a7a7;
    }

    & input {
      position: absolute;
      visibility: hidden;
      top: 2px;
      left: 2px;
      z-index: 2;
      transform: translateY(-21px);
      border: none;
      width: 96%;
      height: 38px;
    }
  }
`;

const Col1 = styled.col`
  width: 102px;
`;

const Col2 = styled.col`
  width: auto;
`;
