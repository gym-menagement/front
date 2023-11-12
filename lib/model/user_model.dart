import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable()
class UserModel {
  
  final int id;
  final int gym;
  final String loginid;
  final String passwd;
  final String name;
  final int role;
  final String image;
  final int sex;
  final String birth;
  final String phonenum;
  final String address;
  final String startday;
  final String endday;
  final String date;

  UserModel({
    
    required this.id,
    required this.gym,
    required this.loginid,
    required this.passwd,
    required this.name,
    required this.role,
    required this.image,
    required this.sex,
    required this.birth,
    required this.phonenum,
    required this.address,
    required this.startday,
    required this.endday,
    required this.date,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
