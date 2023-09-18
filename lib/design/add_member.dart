import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/drop_down_button.dart';
import 'package:gym/common/component/radio_example.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/modal/register_ticket.dart';

void addMember(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        content: SizedBox(
          width: 680,
          height: 400,
          child: Column(
            children: [
              Align(
                alignment: Alignment.topRight,
                child: IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () {
                    Navigator.of(context).pop(); // 모달 닫기
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            width: 131,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "Step 01",
                                      style: TextStyle(
                                        color: PRIMARY_IT_01_COLOR,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                    Text(
                                      "기본정보",
                                      style: TextStyle(
                                        color: PRIMARY_COLOR,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  height: 74,
                                  width: 24,
                                  child: Stack(
                                    children: [
                                      const Center(
                                        child: VerticalDivider(
                                          width: 1.0,
                                          color: PRIMARY_COLOR,
                                        ),
                                      ),
                                      Center(
                                        child: Container(
                                          width: 24,
                                          height: 24,
                                          decoration: const BoxDecoration(
                                            borderRadius: BorderRadius.all(
                                              Radius.circular(16),
                                            ),
                                            color: PRIMARY_COLOR,
                                          ),
                                          child: const Center(
                                            child: Text(
                                              "1",
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 14,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(
                            width: 131,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const SizedBox(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        "Step 02",
                                        style: TextStyle(
                                          color: GREY_400_COLOR,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                      Text(
                                        "이용권 등록",
                                        style: TextStyle(
                                          color: GREY_500_COLOR,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                SizedBox(
                                  height: 74,
                                  width: 24,
                                  child: Stack(
                                    children: [
                                      const Center(
                                        child: VerticalDivider(
                                          width: 1.0,
                                          color: LINE_COLOR,
                                        ),
                                      ),
                                      Center(
                                        child: Container(
                                          width: 24,
                                          height: 24,
                                          decoration: const BoxDecoration(
                                            borderRadius: BorderRadius.all(
                                              Radius.circular(16),
                                            ),
                                            color: GREY_500_COLOR,
                                          ),
                                          child: const Center(
                                            child: Text(
                                              "2",
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 14,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(
                            width: 131,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                SizedBox(
                                  height: 200,
                                  width: 24,
                                  child: Stack(
                                    children: [
                                      Center(
                                        child: VerticalDivider(
                                          width: 1.0,
                                          color: LINE_COLOR,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 16),
                    Container(
                      width: 150,
                      height: 150,
                      decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(
                          Radius.circular(8),
                        ),
                        color: GREY_50_COLOR,
                      ),
                      child: SvgPicture.asset(
                        'asset/svg/icon/gallery-add.svg',
                        width: 34,
                        height: 34,
                        fit: BoxFit.scaleDown,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 280,
                          height: 50,
                          decoration: const BoxDecoration(
                            color: GREY_200_COLOR,
                            borderRadius: BorderRadius.all(
                              Radius.circular(4),
                            ),
                          ),
                          child: const Align(
                            alignment: Alignment.centerLeft,
                            child: Padding(
                              padding: EdgeInsets.only(left: 8.0),
                              child: Text(
                                "M23465-05",
                                style: TextStyle(
                                  fontSize: 16,
                                  color: GREY_900_COLOR,
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(
                              width: 150,
                              height: 50,
                              child: TextField(
                                onChanged: (value) {},
                                decoration: const InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.all(
                                      Radius.circular(4),
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: BorderSide(
                                      width: 1,
                                      color: GREY_400_COLOR,
                                    ),
                                  ),
                                  labelText: "이름",
                                  labelStyle: TextStyle(
                                    color: GREY_400_COLOR,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(
                              width: 120,
                              child: RadioExample(),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        SizedBox(
                          width: 280,
                          height: 50,
                          child: TextField(
                            onChanged: (value) {},
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(4),
                                ),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  width: 1,
                                  color: GREY_400_COLOR,
                                ),
                              ),
                              labelText: "연락처",
                              labelStyle: TextStyle(
                                color: GREY_400_COLOR,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        SizedBox(
                          width: 280,
                          height: 50,
                          child: TextField(
                            onChanged: (value) {},
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(4),
                                ),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  width: 1,
                                  color: GREY_400_COLOR,
                                ),
                              ),
                              labelText: "주소",
                              labelStyle: TextStyle(
                                color: GREY_400_COLOR,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8.0),
                        SizedBox(
                          width: 280,
                          height: 50,
                          child: TextField(
                            onChanged: (value) {},
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(4),
                                ),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  width: 1,
                                  color: GREY_400_COLOR,
                                ),
                              ),
                              labelText: "생년월일",
                              labelStyle: TextStyle(
                                color: GREY_400_COLOR,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8.0),
                        const SizedBox(
                          width: 280,
                          height: 50,
                          child: DropdownButtonExample(),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        actions: <Widget>[
          Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    fixedSize: const Size(120, 48),
                    backgroundColor: Colors.white,
                    elevation: 0,
                    side: const BorderSide(
                      color: GREY_900_COLOR,
                      width: 1,
                    ),
                  ),
                  onPressed: () {
                    Navigator.of(context).pop(); // 모달 닫기
                  },
                  child: const Text(
                    '취소',
                    style: TextStyle(
                      color: GREY_900_COLOR,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    fixedSize: const Size(120, 48),
                    backgroundColor: GREY_900_COLOR,
                    elevation: 0,
                  ),
                  onPressed: () {
                    ActionDialog(
                      context,
                      const ActionContent(
                        sizedBoxWidth: 770,
                        sizedBoxHeight: 745,
                        child: RegisterTicket(),
                      ),
                      ActionAction(
                        prevFunc: () {
                          Navigator.of(context).pop();
                        },
                        nextFunc: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    );
                  },
                  child: const Text(
                    '다음',
                    style: TextStyle(
                      color: WHITE_COLOR,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      );
    },
  );
}
