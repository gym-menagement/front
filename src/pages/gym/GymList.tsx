import { useState, useEffect } from 'react';
import { Card, Button, Input, Badge } from '../../components/ui';
import { Gym as GymModel } from '../../models';
import type { Gym, Status } from '../../types';

const GymList = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    loadGyms();
  }, [page]);

  const loadGyms = async () => {
    try {
      setLoading(true);
      const items = await GymModel.find({ page, pageSize });
      setGyms(items);

      // Calculate total pages from total count
      const totalCount = await GymModel.count();
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error('Failed to load gyms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadGyms();
      return;
    }

    try {
      setLoading(true);
      const items = await GymModel.searchByName(searchQuery, { page: 0, pageSize });
      setGyms(items);
      setPage(0);
    } catch (error) {
      console.error('Failed to search gyms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (gymId: number) => {
    window.location.href = `/gym/${gymId}`;
  };

  if (loading && gyms.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            체육관 찾기
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            가까운 체육관을 찾아보세요
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="체육관 이름으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <Button onClick={handleSearch}>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              검색
            </Button>
            {searchQuery && (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  loadGyms();
                }}
              >
                초기화
              </Button>
            )}
          </div>
        </Card>

        {/* Gym Grid */}
        {gyms.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                검색 결과가 없습니다
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                다른 검색어로 다시 시도해보세요
              </p>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {gyms.map((gym) => (
                <Card
                  key={gym.g_id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Gym Image */}
                  {gym.g_image ? (
                    <img
                      src={gym.g_image}
                      alt={gym.g_name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Gym Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {gym.g_name}
                      </h3>
                      <Badge variant={getStatusColor(gym.g_status)}>
                        {GymModel.getStatus(gym.g_status)}
                      </Badge>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-3">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {gym.g_address}
                      </p>
                    </div>

                    {/* Phone */}
                    {gym.g_phone && (
                      <div className="flex items-center gap-2 mb-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {gym.g_phone}
                        </p>
                      </div>
                    )}

                    {/* Description */}
                    {gym.g_description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {gym.g_description}
                      </p>
                    )}

                    {/* Coordinates */}
                    {gym.g_latitude && gym.g_longitude && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                        위치: {gym.g_latitude.toFixed(6)},{' '}
                        {gym.g_longitude.toFixed(6)}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleViewDetails(gym.g_id)}
                      >
                        상세보기
                      </Button>
                      {gym.g_status === 'ACTIVE' && (
                        <Button
                          variant="secondary"
                          onClick={() =>
                            (window.location.href = `/gym/${gym.g_id}/purchase`)
                          }
                        >
                          회원권 구매
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  이전
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i;
                    } else if (page < 3) {
                      pageNum = i;
                    } else if (page > totalPages - 4) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum + 1}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="secondary"
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page === totalPages - 1}
                >
                  다음
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GymList;
