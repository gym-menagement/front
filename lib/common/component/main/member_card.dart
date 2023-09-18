import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/membership/component/member_used_product.dart';

class MemberCard extends StatelessWidget {
  const MemberCard({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 300,
      height: 280,
      child: Stack(
        children: [
          Positioned(
            left: 20,
            top: 112,
            child: Container(
              width: 260,
              height: 168,
              decoration: ShapeDecoration(
                color: GREY_300_COLOR,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
            ),
          ),
          Positioned(
            left: 0,
            top: 0,
            child: Container(
              width: 300,
              height: 272,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16.0),
                image: const DecorationImage(
                  image: AssetImage(
                    'asset/img/image/user-card.jpg',
                  ),
                  fit: BoxFit.cover,
                  alignment: Alignment.topCenter,
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0.0, 28.0, 0.0, 0.0),
                child: Column(
                  children: [
                    SizedBox(
                      width: 204,
                      height: 60,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Container(
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Container(
                                  width: 60,
                                  height: 60,
                                  decoration: ShapeDecoration(
                                    image: const DecorationImage(
                                      image: AssetImage(
                                        'asset/img/image/ddeok_bok_gi.jpg',
                                      ),
                                      fit: BoxFit.cover,
                                    ),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(16),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                const SizedBox(
                                  width: 88,
                                  height: 40,
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        "No.20230101-01",
                                        style: TextStyle(
                                          fontSize: 12.0,
                                          fontWeight: FontWeight.w500,
                                          fontFamily: 'Outfit',
                                          color: GREY_500_COLOR,
                                        ),
                                      ),
                                      SizedBox(height: 2),
                                      Text(
                                        "김미미(여)",
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          fontWeight: FontWeight.w700,
                                          color: WHITE_COLOR,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 24),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 4, vertical: 8),
                            decoration: ShapeDecoration(
                              color: const Color(0xFF537AF3),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(100),
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: 16,
                                  height: 16,
                                  child: SvgPicture.asset(
                                    'asset/svg/icon/outline/shirt.svg',
                                    fit: BoxFit.fill,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    const MemberUsedProduct(),
                    const SizedBox(height: 8),
                    const MemberUnUsedProduct(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class MemberUnUsedProduct extends StatelessWidget {
  const MemberUnUsedProduct({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 244,
      height: 62,
      decoration: BoxDecoration(
        color: GREY_700_COLOR,
        border: Border.all(
          width: 1,
          color: SUB01_COLOR,
        ),
        borderRadius: const BorderRadius.all(
          Radius.circular(4),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "PT 30회",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: GREY_400_COLOR,
                  ),
                ),
                Row(
                  children: [
                    Text(
                      "종료일",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: GREY_400_COLOR,
                      ),
                    ),
                    Text(
                      "2024.08.24",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: GREY_400_COLOR,
                      ),
                    ),
                    SizedBox(width: 8),
                    Text(
                      "담당",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: GREY_400_COLOR,
                      ),
                    ),
                    SizedBox(width: 4),
                    Text(
                      "박운동",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: GREY_400_COLOR,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Container(
                  width: 36,
                  height: 18,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(32),
                    ),
                    color: SUB01_COLOR,
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "12회",
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
                const Text(
                  "정지",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: SUB01_COLOR,
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
