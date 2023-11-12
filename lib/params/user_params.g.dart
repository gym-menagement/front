// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserParams _$UserParamsFromJson(Map<String, dynamic> json) => UserParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      loginid: json['loginid'] as String?,
      passwd: json['passwd'] as String?,
      name: json['name'] as String?,
      role: json['role'] as int?,
      image: json['image'] as String?,
      sex: json['sex'] as int?,
      birth: json['birth'] as String?,
      phonenum: json['phonenum'] as String?,
      address: json['address'] as String?,
      startday: json['startday'] as String?,
      endday: json['endday'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$UserParamsToJson(UserParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'loginid': instance.loginid,
      'passwd': instance.passwd,
      'name': instance.name,
      'role': instance.role,
      'image': instance.image,
      'sex': instance.sex,
      'birth': instance.birth,
      'phonenum': instance.phonenum,
      'address': instance.address,
      'startday': instance.startday,
      'endday': instance.endday,
      'date': instance.date,
    };
