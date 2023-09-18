import 'package:flutter/material.dart';
import 'package:gym/membership/component/use/use_content_info_text.dart';

class UseContentInfo extends StatelessWidget {
  const UseContentInfo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 260,
      height: 130,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            child: const Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 33,
                  child: UseContentInfoText(
                    name: "시작일",
                    value: "2023.08.24",
                  ),
                ),
                SizedBox(
                  height: 35,
                  child: UseContentInfoText(
                    name: "담당직원",
                    value: "김상담",
                  ),
                ),
                SizedBox(
                  height: 33,
                  child: UseContentInfoText(
                    name: "일시정지",
                    value: "-",
                  ),
                ),
              ],
            ),
          ),
          Container(
            child: const Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 33,
                  child: UseContentInfoText(
                    name: "종료일",
                    value: "2023.08.23",
                  ),
                ),
                SizedBox(
                  height: 35,
                  child: UseContentInfoText(
                    name: "담당트레이너",
                    value: "-",
                  ),
                ),
                SizedBox(
                  height: 33,
                  child: UseContentInfoText(
                    name: "재시작",
                    value: "-",
                  ),
                ),
              ],
            ),
          ),
          Container(
            child: const Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 35,
                  child: UseContentInfoText(
                    name: "락커",
                    value: "미사용",
                    deFont: true,
                  ),
                ),
                SizedBox(
                  height: 35,
                  child: UseContentInfoText(
                    name: "운동복",
                    value: "사용",
                    deFont: true,
                  ),
                ),
                SizedBox(
                  height: 35,
                  child: UseContentInfoText(
                    name: "정지",
                    value: "-",
                    deFont: true,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
