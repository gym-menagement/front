import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/drop_down_button.dart';
import 'package:gym/common/component/radio_example.dart';
import 'package:gym/common/const/colors.dart';

class MemberInfo extends StatelessWidget {
  const MemberInfo({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
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
                      crossAxisAlignment: CrossAxisAlignment.start,
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
        const SizedBox(width: 16),
        Container(
          width: 160,
          height: 160,
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
              width: 305,
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
                  width: 190,
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
              width: 305,
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
              width: 305,
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
              width: 305,
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
              width: 305,
              height: 50,
              child: DropdownButtonExample(),
            ),
          ],
        ),
      ],
    );
  }
}
