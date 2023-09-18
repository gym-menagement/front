import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gym/common/const/colors.dart';

class EmployeeAddCard extends StatelessWidget {
  final VoidCallback createEmployeeFunc;
  const EmployeeAddCard({
    super.key,
    required this.createEmployeeFunc,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: createEmployeeFunc,
      child: Container(
        width: 219,
        height: 120,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
        decoration: ShapeDecoration(
          color: GREY_50_COLOR,
          shape: RoundedRectangleBorder(
            side: const BorderSide(
              width: 1,
              color: LINE_COLOR,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              width: 24,
              height: 24,
              child: SvgPicture.asset(
                'asset/svg/icon/add-square.svg',
                fit: BoxFit.fill,
              ),
            ),
            const SizedBox(
              width: double.infinity,
              child: Text(
                '직원등록',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: GREY_600_COLOR,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
