import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class MemberInfoCard extends StatelessWidget {
  const MemberInfoCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: ShapeDecoration(
                  image: const DecorationImage(
                    image: AssetImage('asset/img/image/ddeok_bok_gi.jpg'),
                    fit: BoxFit.fill,
                  ),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(width: 16),
              Container(
                child: const Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'No.20230101-01',
                      style: TextStyle(
                        color: GREY_500_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                    SizedBox(height: 2),
                    Text(
                      '김미미(여)',
                      style: TextStyle(
                        color: WHITE_COLOR,
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 79),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Birth',
                      style: TextStyle(
                        color: GREY_500_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                    SizedBox(width: 25),
                    Text(
                      '1983.08.10',
                      style: TextStyle(
                        color: WHITE_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 4),
              Container(
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Age',
                      style: TextStyle(
                        color: GREY_500_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                    SizedBox(width: 29),
                    Text(
                      '40',
                      style: TextStyle(
                        color: WHITE_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 4),
              Container(
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Phone',
                      style: TextStyle(
                        color: GREY_500_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                    SizedBox(width: 17),
                    Text(
                      '010-1234-1234',
                      style: TextStyle(
                        color: WHITE_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 4),
              Container(
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      'Address',
                      style: TextStyle(
                        color: GREY_500_COLOR,
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                    SizedBox(width: 6),
                    Text(
                      '경기도 성남시 분당구',
                      style: TextStyle(
                        color: WHITE_COLOR,
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
