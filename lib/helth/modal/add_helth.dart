import 'package:flutter/material.dart';
import 'package:gym/common/component/drop_down_button.dart';
import 'package:gym/common/const/colors.dart';

class AddHelth extends StatelessWidget {
  const AddHelth({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Column(
        children: [
          Text(
            '상품등록',
            style: TextStyle(
              color: GREY_900_COLOR,
              fontSize: 20,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 32.0),
          DropdownButtonExample(),
          SizedBox(height: 16.0),
          DropdownButtonExample(),
          SizedBox(height: 16.0),
          DropdownButtonExample(),
          SizedBox(height: 16.0),
          DropdownButtonExample(),
        ],
      ),
    );
  }
}
