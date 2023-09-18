import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/calendar_button.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/drop_down_button.dart';
import 'package:gym/common/component/radio_example.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/modal/rocker_room.dart';

class RegisterTicket extends StatelessWidget {
  const RegisterTicket({super.key});

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
                          color: GREY_400_COLOR,
                        ),
                      ),
                      Text(
                        "기본정보",
                        style: TextStyle(
                          color: GREY_500_COLOR,
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
                            fontWeight: FontWeight.w500,
                            color: PRIMARY_IT_01_COLOR,
                          ),
                        ),
                        Text(
                          "이용권 등록",
                          style: TextStyle(
                            fontWeight: FontWeight.w500,
                            color: PRIMARY_COLOR,
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
                    height: 450,
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
        // const SizedBox(width: 16),
        SizedBox(
          width: 280,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "헬스",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  color: GREY_900_COLOR,
                ),
              ),
              const SizedBox(height: 8),
              const SizedBox(
                width: 280,
                height: 50,
                child: DropdownButtonExample(),
              ),
              const SizedBox(height: 8),
              const SizedBox(
                width: 280,
                child: CalendarButton(),
              ),
              const SizedBox(height: 16),
              const Text(
                "PT",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  color: GREY_900_COLOR,
                ),
              ),
              const SizedBox(height: 8),
              const SizedBox(
                width: 280,
                height: 50,
                child: DropdownButtonExample(),
              ),
              const SizedBox(height: 8),
              const SizedBox(
                width: 280,
                height: 50,
                child: DropdownButtonExample(),
              ),
              const SizedBox(height: 8),
              const SizedBox(
                width: 280,
                child: CalendarButton(),
              ),
              const SizedBox(height: 16),
              // Text(
              //   "GX",
              //   style: TextStyle(
              //     fontSize: 18,
              //     fontWeight: FontWeight.w500,
              //     color: GREY_900_COLOR,
              //   ),
              // ),
              // SizedBox(height: 8),
              // SizedBox(
              //   width: 280,
              //   height: 50,
              //   child: DropdownButtonExample(),
              // ),
              // SizedBox(height: 8),
              // SizedBox(
              //   width: 280,
              //   child: CalendarButton(),
              // ),
              // SizedBox(height: 16),
              const SizedBox(
                width: 280,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("운동복",
                        style: TextStyle(
                          color: GREY_900_COLOR,
                        )),
                    SizedBox(
                      width: 120,
                      child: RadioExample(),
                    ),
                  ],
                ),
              ),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SizedBox(
                    width: 136,
                    height: 40,
                    child: DropdownButtonExample(),
                  ),
                  SizedBox(
                    width: 136,
                    height: 40,
                    child: DropdownButtonExample(),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              const SizedBox(
                width: 280,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "락커",
                      style: TextStyle(
                        color: GREY_900_COLOR,
                      ),
                    ),
                    SizedBox(
                      width: 120,
                      child: RadioExample(),
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const SizedBox(
                    width: 136,
                    height: 40,
                    child: DropdownButtonExample(),
                  ),
                  SizedBox(
                    width: 136,
                    height: 40,
                    child: InkWell(
                      onTap: () {
                        ActionDialog(
                          context,
                          const ActionContent(
                            sizedBoxWidth: 768,
                            sizedBoxHeight: 696,
                            child: RockerRoom(),
                          ),
                          ActionAction(
                            nextFunc: () {
                              Navigator.of(context).pop();
                            },
                          ),
                        );
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(
                            color: GREY_400_COLOR,
                          ),
                        ),
                        child: const Text(
                          "락커",
                          style: TextStyle(color: GREY_400_COLOR),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        // const SizedBox(width: 16),
        Container(
          width: 220,
          // height: 150,
          decoration: BoxDecoration(
            border: Border.all(
              color: GREY_400_COLOR,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                const Text(
                  "It's time to exercies!",
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 16.0,
                    color: GREY_900_COLOR,
                  ),
                ),
                SizedBox(
                  width: 170,
                  height: 100,
                  child: SvgPicture.asset(
                    'asset/img/image/Isolation_mode.svg',
                    fit: BoxFit.scaleDown,
                  ),
                ),
                const SizedBox(height: 32),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "헬스",
                      style: TextStyle(
                        color: GREY_500_COLOR,
                      ),
                    ),
                    Text(
                      "₩240,000",
                      style: TextStyle(
                        color: GREY_900_COLOR,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "운동복",
                      style: TextStyle(
                        color: GREY_500_COLOR,
                      ),
                    ),
                    Text(
                      "₩0",
                      style: TextStyle(
                        color: GREY_900_COLOR,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "락커",
                      style: TextStyle(
                        color: GREY_500_COLOR,
                      ),
                    ),
                    Text(
                      "₩30,000",
                      style: TextStyle(
                        color: GREY_900_COLOR,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                const Divider(),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "합계",
                      style: TextStyle(
                        color: GREY_500_COLOR,
                      ),
                    ),
                    Text(
                      "₩270,000",
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 18.0,
                        color: GREY_900_COLOR,
                      ),
                    ),
                  ],
                ),
                const Divider(),
                const SizedBox(height: 16),
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: Colors.white,
                    elevation: 0,
                    side: const BorderSide(
                      color: SUB01_COLOR,
                      width: 1,
                    ),
                  ),
                  onPressed: () {},
                  child: const Text(
                    "계약서",
                    style: TextStyle(
                      color: SUB01_COLOR,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: 170,
                  height: 30,
                  child: SvgPicture.asset(
                    'asset/img/image/barcode.svg',
                    fit: BoxFit.scaleDown,
                  ),
                ),
                const SizedBox(height: 8),
                const Text("THANK YOU!")
              ],
            ),
          ),
        ),
      ],
    );
  }
}
