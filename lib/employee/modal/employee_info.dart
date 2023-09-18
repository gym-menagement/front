import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/calendar_button.dart';
import 'package:gym/common/component/drop_down_button.dart';
import 'package:gym/common/component/radio_example.dart';
import 'package:gym/common/const/colors.dart';

class EmployeeInfo extends StatelessWidget {
  const EmployeeInfo({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
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
              width: 276,
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
                  width: 180,
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
                  width: 96,
                  child: RadioExample(),
                ),
              ],
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: 276,
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
            const SizedBox(height: 8),
            SizedBox(
              width: 276,
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
            const SizedBox(height: 8.0),
            SizedBox(
              width: 276,
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
            const SizedBox(height: 24.0),
            const SizedBox(
              width: 276,
              child: CalendarButton(),
            ),
            const SizedBox(height: 8),
            const SizedBox(
              width: 276,
              height: 50,
              child: DropdownButtonExample(),
            ),
          ],
        ),
      ],
    );
  }
}
