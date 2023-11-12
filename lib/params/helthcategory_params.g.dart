// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'helthcategory_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HelthcategoryParams _$HelthcategoryParamsFromJson(Map<String, dynamic> json) =>
    HelthcategoryParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      name: json['name'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$HelthcategoryParamsToJson(
        HelthcategoryParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
